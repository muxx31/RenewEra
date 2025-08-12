const Request = require('../models/Request');

// Get all requests (can add query filters for supplier or materialPost)
const getRequests = async (req, res) => {
  try {
    let filter = {};
    if (req.query.supplier) filter.supplier = req.query.supplier;
    if (req.query.materialPost) filter.materialPost = req.query.materialPost;

    const requests = await Request.find(filter)
      .populate('supplier', 'name email')
      .populate('materialPost', 'title startup');  // populate startup if needed
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get requests for logged-in startup
const getRequestsForStartup = async (req, res) => {
  try {
    // Find all requests where the materialPost's startup matches logged-in startup
    // Assuming MaterialPost model has a field 'startup' referencing the startup id
    const requests = await Request.find()
      .populate({
        path: 'materialPost',
        match: { startup: req.user.id },  // filter materialPosts owned by this startup
        select: 'title startup',
      })
      .populate('supplier', 'name email');

    // Filter out requests where materialPost is null (because match filter excludes them)
    const filteredRequests = requests.filter(r => r.materialPost !== null);

    res.json(filteredRequests);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get request by ID
const getRequestById = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id)
      .populate('supplier', 'name email')
      .populate('materialPost', 'title');
    if (!request) return res.status(404).json({ message: 'Request not found' });
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a request (supplier responding to material post)
const createRequest = async (req, res) => {
  try {
    const { materialPost, message, offerPrice } = req.body;
    const newRequest = new Request({
      materialPost,
      supplier: req.user.id,
      message,
      offerPrice,
    });
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update request status (accept/reject)
const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'accepted', 'rejected'].includes(status))
      return res.status(400).json({ message: 'Invalid status' });

    const updatedRequest = await Request.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updatedRequest) return res.status(404).json({ message: 'Request not found' });
    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getRequests,
  getRequestById,
  createRequest,
  updateRequestStatus,
  getRequestsForStartup,  // <-- added new export
};
