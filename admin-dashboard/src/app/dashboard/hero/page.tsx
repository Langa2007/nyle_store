"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  X, 
  ImageIcon, 
  ExternalLink,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  Layout,
  Type,
  Link as LinkIcon,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { 
  getHeroSlides, 
  createHeroSlide, 
  updateHeroSlide, 
  deleteHeroSlide 
} from "@/services/heroServices";

export default function HeroManagementPage() {
  const [slides, setSlides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    button_text: "Shop Now",
    button_link: "/products",
    order_index: 0,
    is_active: true
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fetchSlides = async () => {
    setLoading(true);
    try {
      const data = await getHeroSlides();
      setSlides(Array.isArray(data) ? data : []);
    } catch (error: any) {
      toast.error("Failed to fetch slides: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      button_text: "Shop Now",
      button_link: "/products",
      order_index: slides.length,
      is_active: true
    });
    setSelectedFile(null);
    setEditingSlide(null);
  };

  const handleOpenModal = (slide: any = null) => {
    if (slide) {
      setEditingSlide(slide);
      setFormData({
        title: slide.title || "",
        subtitle: slide.subtitle || "",
        button_text: slide.button_text || "Shop Now",
        button_link: slide.button_link || "/products",
        order_index: slide.order_index || 0,
        is_active: slide.is_active ?? true
      });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const fData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        fData.append(key, value.toString());
      });
      
      if (selectedFile) {
        fData.append("image", selectedFile);
      }

      if (editingSlide) {
        await updateHeroSlide(editingSlide.id, fData);
        toast.success("Slide updated successfully");
      } else {
        if (!selectedFile) {
          toast.error("Please select an image");
          setSubmitting(false);
          return;
        }
        await createHeroSlide(fData);
        toast.success("Slide created successfully");
      }
      
      setIsModalOpen(false);
      fetchSlides();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this slide?")) return;
    
    try {
      await deleteHeroSlide(id);
      toast.success("Slide deleted successfully");
      fetchSlides();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const toggleStatus = async (slide: any) => {
    try {
      await updateHeroSlide(slide.id, { is_active: !slide.is_active });
      toast.success(`Slide ${!slide.is_active ? 'activated' : 'deactivated'}`);
      fetchSlides();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Layout className="w-6 h-6 text-blue-500" />
            Hero Management
          </h1>
          <p className="text-gray-400">Manage the carousel images and content on the home page</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Slide
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
          <p className="text-gray-400">Loading hero slides...</p>
        </div>
      ) : slides.length === 0 ? (
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500">
            <ImageIcon className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No slides found</h3>
          <p className="text-gray-400 max-w-md mx-auto mb-6">
            Get started by adding your first hero slide. These will appear in the gliding carousel on the main page.
          </p>
          <button
            onClick={() => handleOpenModal()}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all font-medium"
          >
            <Plus className="w-5 h-5" />
            Create Your First Slide
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slides.map((slide) => (
            <div 
              key={slide.id} 
              className={`bg-gray-900 border ${slide.is_active ? 'border-gray-800' : 'border-red-900/30'} rounded-2xl overflow-hidden shadow-xl group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={slide.image_url} 
                  alt={slide.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {!slide.is_active && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Inactive</span>
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-2">
                  <button 
                    onClick={() => toggleStatus(slide)}
                    className={`p-2 rounded-lg backdrop-blur-md transition-colors ${slide.is_active ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30' : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'}`}
                    title={slide.is_active ? "Deactivate" : "Activate"}
                  >
                    {slide.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-white text-lg line-clamp-1">{slide.title || "No Title"}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2 mt-1">{slide.subtitle || "No subtitle provided"}</p>
                  </div>
                  <span className="bg-gray-800 text-blue-400 px-2 py-1 rounded text-xs font-bold">#{slide.order_index}</span>
                </div>
                
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => handleOpenModal(slide)}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(slide.id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-3 py-2 rounded-lg transition-all text-sm border border-red-500/20"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Slide Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <form onSubmit={handleSubmit}>
                <div className="p-6 border-b border-gray-800 flex items-center justify-between bg-gradient-to-r from-blue-900/20 to-purple-900/20">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    {editingSlide ? <Edit2 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    {editingSlide ? "Edit Hero Slide" : "Create New Hero Slide"}
                  </h2>
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 max-h-[70vh] overflow-y-auto w-full scrollbar-thin scrollbar-thumb-gray-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Content Section */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5 flex items-center gap-2">
                          <Type className="w-4 h-4" /> Slide Title
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                          placeholder="e.g. Discover Amazing Products"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Subtitle / Description</label>
                        <textarea
                          rows={3}
                          value={formData.subtitle}
                          onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                          className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                          placeholder="Brief description that attracts customers..."
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1.5">Button Text</label>
                          <input
                            type="text"
                            value={formData.button_text}
                            onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
                            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1.5 flex items-center gap-2">
                             <LinkIcon className="w-4 h-4" /> Link (URL)
                          </label>
                          <input
                            type="text"
                            value={formData.button_link}
                            onChange={(e) => setFormData({ ...formData, button_link: e.target.value })}
                            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Image & Settings Section */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5 flex items-center gap-2">
                          <ImageIcon className="w-4 h-4" /> Hero Image
                        </label>
                        <div className="relative group aspect-video bg-gray-800 rounded-xl border-2 border-dashed border-gray-700 hover:border-blue-500 transition-all flex flex-col items-center justify-center overflow-hidden cursor-pointer">
                          {(selectedFile || editingSlide?.image_url) ? (
                            <>
                              <img 
                                src={selectedFile ? URL.createObjectURL(selectedFile) : editingSlide?.image_url} 
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <span className="text-white text-sm font-medium">Change Image</span>
                              </div>
                            </>
                          ) : (
                            <>
                              <Plus className="w-8 h-8 text-gray-600 mb-2" />
                              <span className="text-xs text-gray-500">Upload high-res image (16:9)</span>
                            </>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Order (Index)</label>
                        <div className="flex items-center gap-3">
                          <input
                            type="number"
                            value={formData.order_index}
                            onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
                            className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                          />
                          <div className="flex flex-col gap-1">
                            <button 
                              type="button" 
                              onClick={() => setFormData({...formData, order_index: formData.order_index + 1})}
                              className="p-1 hover:bg-gray-800 rounded text-gray-400"
                            >
                              <ChevronUp className="w-4 h-4" />
                            </button>
                            <button 
                              type="button" 
                              onClick={() => setFormData({...formData, order_index: Math.max(0, formData.order_index - 1)})}
                              className="p-1 hover:bg-gray-800 rounded text-gray-400"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, is_active: !formData.is_active })}
                          className={`w-12 h-6 rounded-full transition-colors relative ${formData.is_active ? 'bg-blue-600' : 'bg-gray-700'}`}
                        >
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.is_active ? 'left-7' : 'left-1'}`} />
                        </button>
                        <span className="text-sm font-medium text-gray-400">Current Status: {formData.is_active ? 'Active' : 'Inactive'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-gray-800 flex justify-end gap-3 bg-gray-900/50">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2.5 text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-2.5 rounded-xl transition-all font-bold shadow-lg shadow-blue-900/20 disabled:opacity-50"
                  >
                    {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    {editingSlide ? "Save Changes" : "Create Slide"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
