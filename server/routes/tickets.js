import express from "express";
import authToken from "../middleware/authToken.js";
import Ticket from "../model/Ticket.js";
const router = express.Router();

// Create a new ticket
router.post("/", authToken, async (req, res) => {
  try {
    // console.log("Ticket data received:", req.body);
    const { title, description, status, priority } = req.body;

    const newTicket = await Ticket.create({
      title,
      description,
      status,
      priority,
      createdBy: req.user.id,
    });

    return res.status(201).json({
      message: "Ticket created successfully",
      ticket: newTicket,
    });
  } catch (err) {
    console.error("Error creating ticket:", err);
    return res.status(500).json({ error: "Failed to create ticket" });
  }
});

// Get all tickets for the logged-in user
router.get("/", authToken, async (req, res) => {
  try {
    const allTickets = await Ticket.find({ createdBy: req.user.id }).sort({
      createdAt: -1,
    }); // Sort by newest first
    return res.status(200).json(allTickets);
  } catch (err) {
    console.error("Error fetching tickets:", err);
    return res.status(500).json({ error: "Failed to fetch tickets" });
  }
});

// Update Ticket
router.put("/:id", authToken, async (req, res) => {
  try {
    const ticketId = req.params.id;
    const user = req.user;
    const { title, description, status, priority } = req.body;

    // find the ticket
    const ticket = await Ticket.findById(ticketId);

    // Check if ticket exist
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Make sure the user owns the ticket
    if (ticket.createdBy.toString() !== user.id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Update the ticket
    const updatedTicket = await Ticket.findByIdAndUpdate(
      ticketId,
      {
        title,
        description,
        status,
        priority,
      }, // update: An object containing the fields to be updated along with their new values
      { new: true } // options: new: If set to true, returns the modified document rather than the original. Defaults to false.
    );

    return res
      .status(200)
      .json({ message: "Ticket updated successfully", ticket: updatedTicket });
  } catch (err) {
    return res.status(500).json({ error: "Failed to update ticket" });
  }
});

// Delete ticket
router.delete("/:id", authToken, async (req, res) => {
  try {
    const user = req.user;
    const ticketId = req.params.id;

    // find the ticket
    const ticket = await Ticket.findById(ticketId);

    // Check if ticket exist
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Make sure the user owns the ticket
    if (ticket.createdBy.toString() !== user.id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Ticket.findByIdAndDelete(ticketId);

    return res.status(200).json({ message: "Ticket successfully deleted" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
