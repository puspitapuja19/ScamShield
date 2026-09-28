import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { UploadCloud, Image as ImageIcon, X } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../api/axios";
import { MAX_FILE_SIZE_MB, ALLOWED_FILE_TYPES } from "../../constants";

export default function UploadZone({ onScanComplete }) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  const validateFile = (selectedFile) => {
    if (!ALLOWED_FILE_TYPES.includes(selectedFile.type)) {
      toast.error("শুধু JPG, PNG, WEBP image upload করা যাবে");
      return false;
    }
    if (selectedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      toast.error(`File size সর্বোচ্চ ${MAX_FILE_SIZE_MB}MB হতে পারবে`);
      return false;
    }
    return true;
  };

  const handleFile = (selectedFile) => {
    if (!selectedFile || !validateFile(selectedFile)) return;
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post("/scan/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Scan সম্পন্ন হয়েছে!");
      onScanComplete(response.data);
      handleReset();
    } catch (err) {
      const detail = err.response?.data?.detail || "Scan করতে সমস্যা হয়েছে";
      toast.error(detail);
    } finally {
      setUploading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="w-full">
      {!preview ? (
        <motion.div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          animate={isDragging ? { scale: 1.02 } : { scale: 1 }}
          className={`glass rounded-2xl border-2 border-dashed p-12 flex flex-col items-center justify-center gap-4 cursor-pointer transition-colors ${
            isDragging ? "border-purple-500 shadow-glow-purple" : "border-navy-700"
          }`}
        >
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-16 h-16 rounded-full bg-purple-600/20 flex items-center justify-center"
          >
            <UploadCloud className="text-purple-400" size={28} />
          </motion.div>
          <div className="text-center">
            <p className="text-white font-medium">Screenshot টেনে আনো অথবা click করো</p>
            <p className="text-gray-500 text-sm mt-1">JPG, PNG, WEBP — সর্বোচ্চ {MAX_FILE_SIZE_MB}MB</p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept={ALLOWED_FILE_TYPES.join(",")}
            className="hidden"
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </motion.div>
      ) : (
        <div className="glass rounded-2xl p-6">
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="w-full max-h-80 object-contain rounded-xl bg-navy-900"
            />
            <button
              onClick={handleReset}
              className="absolute top-2 right-2 bg-navy-900/80 hover:bg-navy-800 rounded-full p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
            <ImageIcon size={16} />
            <span className="truncate">{file?.name}</span>
          </div>

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full mt-4 px-6 py-3 rounded-xl bg-gradient-purple text-white font-medium shadow-glow-purple hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? "Analyze করা হচ্ছে..." : "Scan করুন"}
          </button>
        </div>
      )}
    </div>
  );
}