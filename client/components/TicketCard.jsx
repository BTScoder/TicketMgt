import { Edit, Trash2 } from "lucide-react";

const TicketCard = ({
  ticket,
  onEdit,
  onDelete,
  setSelectedTicket,
  editTicket,
  deleteTicket,
}) => {
  const statusColors = {
    open: "bg-green-100 text-green-800",
    inProgress: "bg-blue-100 text-blue-800",
    closed: "bg-gray-100 text-gray-800",
  };

  const priorityColors = {
    high: "bg-red-100 text-red-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-green-100 text-green-800",
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-800">{ticket.title}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => {
              editTicket(ticket);
            }}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Edit ticket"
          >
            <Edit size={18} className="text-blue-600" />
          </button>
          <button
            onClick={() => deleteTicket(ticket._id)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Delete ticket"
          >
            <Trash2 size={18} className="text-red-600" />
          </button>
        </div>
      </div>

      <p className="text-gray-600 mb-4">{ticket.description}</p>

      <div className="flex gap-2 mb-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            statusColors[ticket.status]
          }`}
        >
          {ticket.status === "inProgress" ? "In Progress" : ticket.status}
        </span>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            priorityColors[ticket.priority]
          }`}
        >
          {ticket.priority}
        </span>
      </div>

      <p className="text-xs text-gray-500">
        Created: {new Date(ticket.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default TicketCard;
