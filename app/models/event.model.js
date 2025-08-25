// // app/models/event.model.js
// import mongoose from "mongoose";

// const EventSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   location: {
//     type: String,
//     required: true,
//   },
//   date: {
//     type: Date,
//     required: true,
//   },
// }, { timestamps: true });

// // ✅ Safe export (to avoid OverwriteModelError)
// export default mongoose.models.Event || mongoose.model("Event", EventSchema);
