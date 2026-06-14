import mongoose, { Schema, models, model } from "mongoose";

const DoctorSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    specialty: { type: String, required: true },
    qualification: { type: String, default: "" },
    experience: { type: Number, default: 0 },
    bio: { type: String, default: "" },
    image: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    fees: { type: Number, default: 0 },
    availableDays: { type: [String], default: [] },
    availableTime: { type: String, default: "" },
    rating: { type: Number, default: 5 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default models.Doctor || model("Doctor", DoctorSchema);
