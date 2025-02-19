import express from 'express';
import { auth } from '../middleware/auth.js';
import { createComplaint } from '../controllers/complaintController.js';
import {
  createComplaint,
  getComplaints,
  resolveComplaint,
  voteComplaint,
  getTrendingComplaints,
} from '../controllers/complaintController.js';

const router = express.Router();

router.post('/', auth, createComplaint);
router.get('/', auth, getComplaints);
router.put('/:id/resolve', auth, resolveComplaint);
router.post('/:id/vote', auth, voteComplaint);
router.get('/trending', auth, getTrendingComplaints);

export default router;
