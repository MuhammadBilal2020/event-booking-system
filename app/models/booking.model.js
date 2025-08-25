import mongoose from 'mongoose';
const { Schema } = mongoose;

const BookingSchema = new Schema({
  venueId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Venue',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  offerId: {
    type: String, // ID from Venue.offers
    required: false
  },
  totalPrice: {
    type: Number,
    required: true
  },
  paymentMode: {
    type: String,
    enum: ['online', 'offline'],
    required: true
  },
  
  bookingStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  userNote: {
    type: String
  }
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
