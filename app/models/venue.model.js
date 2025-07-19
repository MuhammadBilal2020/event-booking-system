// models/venue.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

// Amenities schema (sub-document)
const AmenitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

// Offers schema (sub-document)
const OfferSchema = new Schema({
  offerId: {
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
  amenities: [AmenitySchema], // array of objects with name
  offers: [OfferSchema],       // array of offers
}, { timestamps: true });

// Export the model
export default mongoose.models.Venue || mongoose.model("Venue", VenueSchema);
