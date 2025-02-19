import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  flatCode: { type: String, required: true },
  karmaPoints: { type: Number, default: 0 },
});

export default mongoose.model('User', userSchema);