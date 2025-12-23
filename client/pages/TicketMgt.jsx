import { useUserContext } from "../context/userContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TicketCard from "../components/TicketCard";
import Modal from "../components/Modal";
import toast from "react-hot-toast";
import api from "../src/api";
import { useEffect, useState } from "react";
const TicketMgt = () => {
  const { user } = useUserContext();
  const [tickets, setTickets] = useState([]);
  const [open, setOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "open",
    priority: "medium",
  });
  useEffect(() => {
    try {
      const fetchTickets = async () => {
        const res = await api.get("/tickets");
        // console.log("Fetched tickets:", res.data);
        setTickets(res.data);
      };
      fetchTickets();
    } catch (err) {
      console.log("Error fetching tickets:", err);
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Reset form
  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      status: "open",
      priority: "medium",
    });
  };
  // Create a new ticket
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/tickets", form);
      setTickets([...tickets, res.data.ticket]);
      setOpen(false);
      setForm({
        title: "",
        description: "",
        status: "open",
        priority: "medium",
      });
      toast.success(res.data.message, {
        style: {
          background: "#22c55e",
          color: "#fff",
          fontWeight: "600",
        },
      });
    } catch (err) {
      console.log("Error creating ticket:", err);
      toast.error("Failed to create ticket");
    }
  };

  // Edit ticket function
  const editTicket = (ticket) => {
    setOpen(true);
    setUpdating(true);
    setSelectedTicket(ticket);
    setForm({
      title: ticket.title,
      description: ticket.description,
      status: ticket.status,
      priority: ticket.priority,
    });
  };

  // Update Ticket
  const updateTicket = async (e, ticketId) => {
    e.preventDefault();
    try {
      const res = await api.put(`/tickets/${ticketId}`, form);
      const updatedTicket = res.data.ticket;
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket._id === ticketId ? updatedTicket : ticket
        )
      );
      setOpen(false);
      setUpdating(false);
      setSelectedTicket("");
      setForm({
        title: "",
        description: "",
        status: "open",
        priority: "medium",
      });
      toast.success(res.data.message, {
        style: {
          background: "#22c55e",
          color: "#fff",
          fontWeight: "600",
        },
      });
    } catch (err) {
      console.log("Error updating ticket:", err);
      toast.error("Failed to update ticket");
    }
  };

  // Delete functinality
  const deleteTicket = async (ticketId) => {
    const res = await api.delete(`/tickets/${ticketId}`);
    setTickets(tickets.filter((ticket) => ticket._id !== ticketId));
    toast.success(res.data.message, {
      style: {
        background: "#22c55e",
        color: "#fff",
        fontWeight: "600",
      },
    });
  };
  // console.log(selectedTicket);
  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto my-10 px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-blue-600">
            Ticket Management
          </h2>
          <button
            className="py-3 px-6 bg-blue-600 rounded-2xl text-white font-bold"
            onClick={() => {
              setOpen(true);
              resetForm();
            }}
          >
            <span className="text-xl me-2">+</span> Create Ticket
          </button>
        </div>
        <Modal
          show={open}
          onClose={() => setOpen(false)}
          setUpdating={setUpdating}
        >
          <form className="space-y-4 mt-10">
            <div>
              <label
                htmlFor="title"
                className="block mb-3 text-sm font-semibold text-gray-600"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                onChange={handleChange}
                value={form.title}
                className="w-full border rounded p-2 border-gray-300"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block mb-3 text-sm font-semibold text-gray-600"
              >
                Description
              </label>
              <input
                type="text"
                name="description"
                id="description"
                onChange={handleChange}
                value={form.description}
                className="w-full border rounded p-2 h-24 border-gray-300"
              />
            </div>
            <div>
              <label
                htmlFor="status"
                className="block mb-3 text-sm font-semibold text-gray-600"
              >
                Status
              </label>
              <select
                name="status"
                id="status"
                onChange={handleChange}
                value={form.status}
                className="w-full text-gray-600 py-3 outline-0"
              >
                <option value="open">Open</option>
                <option value="inProgress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="priority"
                className="block mb-3 text-sm font-semibold text-gray-600"
              >
                Priority
              </label>
              <select
                name="priority"
                id="priority"
                onChange={handleChange}
                value={form.priority}
                className="w-full text-gray-600 py-3 outline-0"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            {updating ? (
              <button
                type="button"
                className="bg-blue-600 px-4 py-3 text-white font-semibold rounded-2xl"
                onClick={(e) => updateTicket(e, selectedTicket._id)}
              >
                Update Ticket
              </button>
            ) : (
              <button
                type="button"
                className="bg-blue-600 px-4 py-3 text-white font-semibold rounded-2xl"
                onClick={handleSubmit}
              >
                Create Ticket
              </button>
            )}
          </form>
        </Modal>

        <div>
          <div className="md:grid md:grid-cols-2 lg:grid-cols-3 max-w-[1200px] mx-auto gap-6">
            {tickets.length > 0 ? (
              tickets.map((ticket) => (
                <TicketCard
                  key={ticket._id}
                  ticket={ticket}
                  setSelectedTicket={setSelectedTicket}
                  editTicket={editTicket}
                  deleteTicket={deleteTicket}
                />
              ))
            ) : (
              <p>No tickets found</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default TicketMgt;
