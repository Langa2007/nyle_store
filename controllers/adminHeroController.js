import * as HeroSlide from '../models/heroSlideModel.js';
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

const uploadToCloudinary = (fileBuffer, folder = "nyle-hero") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

export const createSlide = async (req, res) => {
  try {
    const { title, subtitle, button_text, button_link, order_index } = req.body;
    let image_url = '';

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      image_url = uploadResult.secure_url;
    } else if (req.body.image_url) {
      image_url = req.body.image_url;
    }

    if (!image_url) {
      return res.status(400).json({ error: 'Image is required' });
    }

    const slide = await HeroSlide.createHeroSlide({
      title,
      subtitle,
      image_url,
      button_text,
      button_link,
      order_index: parseInt(order_index) || 0
    });

    res.status(201).json(slide);
  } catch (err) {
    console.error('Error creating hero slide:', err);
    res.status(500).json({ error: err.message });
  }
};

export const getAllSlides = async (req, res) => {
  try {
    const slides = await HeroSlide.getAllHeroSlides();
    res.json(slides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      data.image_url = uploadResult.secure_url;
    }

    const slide = await HeroSlide.updateHeroSlide(id, data);
    if (!slide) {
      return res.status(404).json({ error: 'Slide not found' });
    }
    res.json(slide);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const slide = await HeroSlide.deleteHeroSlide(id);
    if (!slide) {
      return res.status(404).json({ error: 'Slide not found' });
    }
    res.json({ message: 'Slide deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Public method to get active slides
export const getActiveSlides = async (req, res) => {
  try {
    const slides = await HeroSlide.getAllHeroSlides(true);
    res.json(slides);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
