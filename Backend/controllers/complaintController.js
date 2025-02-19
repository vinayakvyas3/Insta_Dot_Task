import Complaint from '../models/Complaint.js';

// File a new complaint
export const createComplaint = async (req, res) => {
  const { title, description, type, severity } = req.body;
  const createdBy = req.user._id; // User ID from JWT token
  const flatCode = req.user.flatCode; // Flat code from the user

  try {
    const complaint = await Complaint.create({
      title,
      description,
      type,
      severity,
      createdBy,
      flatCode,
    });

    res.status(201).json(complaint);
  } catch (err) {
    res.status(500).json({ error: 'Failed to file complaint' });
  }
};

// List all active complaints
export const getComplaints = async (req, res) => {
  const flatCode = req.user.flatCode; // Fetch complaints for the user's flat

  try {
    const complaints = await Complaint.find({ flatCode, resolved: false }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch complaints' });
  }
};

// Mark a complaint as resolved
export const resolveComplaint = async (req, res) => {
  const { id } = req.params;

  try {
    const complaint = await Complaint.findById(id);
    if (!complaint) return res.status(404).json({ error: 'Complaint not found' });

    // Only the creator can resolve the complaint
    if (complaint.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to resolve this complaint' });
    }

    complaint.resolved = true;
    await complaint.save();

    // Award karma points to the user who resolved the complaint
    const user = await User.findById(req.user._id);
    user.karmaPoints += 10; // Example: 10 points for resolving a complaint
    await user.save();

    res.json({ message: 'Complaint resolved successfully', complaint });
  } catch (err) {
    res.status(500).json({ error: 'Failed to resolve complaint' });
  }
};

// Upvote or downvote a complaint
export const voteComplaint = async (req, res) => {
  const { id } = req.params;
  const { voteType } = req.body; // 'upvote' or 'downvote'

  try {
    const complaint = await Complaint.findById(id);
    if (!complaint) return res.status(404).json({ error: 'Complaint not found' });

    // Update votes based on voteType
    if (voteType === 'upvote') {
      complaint.votes += 1;
    } else if (voteType === 'downvote') {
      complaint.votes -= 1;
    } else {
      return res.status(400).json({ error: 'Invalid vote type' });
    }

    await complaint.save();

    // Auto-archive downvoted complaints after 3 days (example logic)
    if (complaint.votes <= -3) {
      setTimeout(async () => {
        complaint.resolved = true;
        await complaint.save();
      }, 3 * 24 * 60 * 60 * 1000); // 3 days in milliseconds
    }

    res.json({ message: 'Vote recorded successfully', complaint });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record vote' });
  }
};

// Fetch trending complaints (most upvoted)
export const getTrendingComplaints = async (req, res) => {
  const flatCode = req.user.flatCode;

  try {
    const complaints = await Complaint.find({ flatCode, resolved: false })
      .sort({ votes: -1 })
      .limit(5); // Fetch top 5 trending complaints
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch trending complaints' });
  }
};