import mongoose, { Schema, models, model } from "mongoose";

const BlogPostSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, default: "" },
    content: { type: String, required: true },
    cover: { type: String, default: "" },
    category: { type: String, default: "Health" },
    author: { type: String, default: "SPMHealth Team" },
    tags: { type: [String], default: [] },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default models.BlogPost || model("BlogPost", BlogPostSchema);
