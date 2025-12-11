import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["open", "inProgress", "closed"], // Only these 3 values allowed
      default: "open",
    },
    priority: {
      type: String,
      enum: ["high", "medium", "low"], // Only these 3 values allowed
      default: "medium",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Ticket = new mongoose.model("Ticket", ticketSchema);

export default Ticket;
