const Material = require('../models/MaterialPost'); // Make sure path is correct
const Request = require('../models/Request');   // If using requests

// GET all materials for logged-in supplier

const getMaterials = async (req, res) => {
  try {
    const materials = await Material.find({ supplier: req.user.id }) // use id here
      .sort({ createdAt: -1 });
    res.json(materials);
  } catch (err) {
    console.error('Get Materials Error:', err);
    res.status(500).json({ message: 'Server error fetching materials' });
  }
};


// GET requests received for supplier's materials
const getRequests = async (req, res) => {
  try {
    const requests = await Request.find({ supplier: req.user._id })
      .populate('startup', 'name email')
      .populate('materialPost', 'materialType quantity pickupAddress');
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching requests' });
  }
};

// POST a new material
// const addMaterial = async (req, res) => {
//   try {
//     const { materialType, quantity, pickupAddress, freeOrPaid, description } = req.body;

//     if (!materialType || !quantity || !pickupAddress || !freeOrPaid) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     const newMaterial = new Material({
//       supplier: req.user._id,
//       materialType,
//       quantity: Number(quantity),
//       pickupAddress,
//       freeOrPaid,
//       description: description || '',
//       file: req.file ? req.file.filename : undefined,
//     });

//     const savedMaterial = await newMaterial.save();
//     res.status(201).json(savedMaterial);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error adding material' });
//   }
// };


//
const addMaterial = async (req, res) => {
  try {
    console.log('Logged-in user info:', req.user);
console.log('Request body:', req.body);
console.log('Uploaded file:', req.file);


    const { materialType, quantity, pickupAddress, freeOrPaid, description } = req.body;
    if (!materialType || !quantity || !pickupAddress || !freeOrPaid) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newMaterial = new Material({
      supplier: req.user.id,
      materialType,
      quantity: Number(quantity),
      pickupAddress,
      freeOrPaid,
      description: description || '',
      file: req.file ? req.file.filename : undefined,
    });

    const savedMaterial = await newMaterial.save();
    res.status(201).json(savedMaterial);
  } catch (err) {
    console.error('Add Material Error:', err);
    res.status(500).json({ message: 'Server error adding material' });
  }
};

//



module.exports = {
  getMaterials,
  getRequests,
  addMaterial,
};
