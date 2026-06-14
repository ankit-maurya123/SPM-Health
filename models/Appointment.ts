import mongoose, { Schema, models, model } from "mongoose";

const AppointmentSchema = new Schema(
  {
    patientName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },
    age: { type: Number, default: 0 },
    gender: { type: String, enum: ["male", "female", "other"], default: "other" },
    doctorId: { type: Schema.Types.ObjectId, ref: "Doctor" },
    doctorName: { type: String, default: "" },
    department: { type: String, default: "" },
    date: { type: String, required: true },
    time: { type: String, required: true },
    message: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default models.Appointment || model("Appointment", AppointmentSchema);
