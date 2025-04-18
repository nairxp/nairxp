import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.Image || mongoose.model('Image', ImageSchema);
