// models/venue.js
import mongoose from 'mongoose';
const { Schema } = mongoose;



// Offers schema (sub-document)
const OfferSchema = new Schema({
  offerId: {
    type: String,
    required: true,
  },
  offerName: {
    type: String,
    required: true,
  },
  offerDescription: {
    type: String,
    required: true,
  },
  offerPrice: {
    type: String, // or Number if you're storing price as a number
    required: true,
  },
});

// Main Event schema
const VenueSchema = new Schema({
  venueName: {
    type: String,
    required: true,
  },
  mainImage: {
    type: String, // Usually URL or file path
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  galleryImages: {
    type: [String], // Array of image URLs or file paths
    default: [],
  },
  venueType: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'under_maintenance', 'closed'],
    default: 'active'
  },

  isDeleted: {
    type: Boolean,
    default: false
  },


  // availableDates: [{
  //   type: Date,
  //   required: true
  // }],




  offers: [OfferSchema],       // array of offers
}, { timestamps: true });

// Export the model
export default mongoose.models.Venue || mongoose.model("Venue", VenueSchema);
// export default mongoose.models.Event || mongoose.model("Event", EventSchema);
