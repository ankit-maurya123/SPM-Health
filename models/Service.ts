import mongoose, { Schema, models, model } from "mongoose";

const ServiceSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    shortDescription: { type: String, default: "" },
    description: { type: String, default: "" },
    icon: { type: String, default: "Heart" },
    image: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default models.Service || model("Service", ServiceSchema);
