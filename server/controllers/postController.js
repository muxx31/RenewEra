const MaterialPost = require('../models/MaterialPost');

// Get all material posts
const getMaterialPosts = async (req, res) => {
  try {
    const posts = await MaterialPost.find()
      .populate('startup', 'name email')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get material post by ID
const getMaterialPostById = async (req, res) => {
  try {
    const post = await MaterialPost.findById(req.params.id)
      .populate('startup', 'name email');
    if (!post) return res.status(404).json({ message: 'Material post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create material post (protected)
const createMaterialPost = async (req, res) => {
  try {
    const { title, description, materialType, quantity, unit } = req.body;
    const newPost = new MaterialPost({
      startup: req.user.id,  // from authMiddleware
      title,
      description,
      materialType,
      quantity,
      unit,
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update material post (protected)
const updateMaterialPost = async (req, res) => {
  try {
    const updatedPost = await MaterialPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPost) return res.status(404).json({ message: 'Material post not found' });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete material post (protected)
const deleteMaterialPost = async (req, res) => {
  try {
    const deletedPost = await MaterialPost.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ message: 'Material post not found' });
    res.json({ message: 'Material post deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getMaterialPosts,
  getMaterialPostById,
  createMaterialPost,
  updateMaterialPost,
  deleteMaterialPost,
};
