import mongoose, { Schema, models, model } from "mongoose";

const AdminSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "super"], default: "admin" },
  },
  { timestamps: true }
);

export type AdminDoc = mongoose.InferSchemaType<typeof AdminSchema> & {
  _id: mongoose.Types.ObjectId;
};

export default models.Admin || model("Admin", AdminSchema);
