import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../src/api";
import { Link } from "react-router-dom";
import { Ticket, Clock, CircleDot, CircleCheck, Circle } from "lucide-react";
const Dashboard = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    try {
      const fetchTickets = async () => {
        const res = await api.get("/tickets");
        setTickets(res.data);
      };

      fetchTickets();
    } catch (err) {
      console.log("Error fetching tickets:", err);
    }
  }, []);
  console.log(tickets);
  return (
    <>
      <Header />
      <section className=" my-10 px-4 py-10 bg-gray-400/10">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-4">
            <p className="md:text-5xl text-3xl font-bold text-gray-900">
              Welcome back, Chidinma
            </p>
            <p className="md:text-lg text-gray-700">
              Here is an overview of your ticket management system
            </p>
          </div>

          <div className="md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            <div className="bg-white w-full px-4 py-3 space-y-5 rounded-xl hover:shadow-lg transition-shadow">
              <Ticket className="w-8 h-8 text-blue-600  rounded-lg" />
              <p className=" text-gray-600">Total Tickets</p>
              <p className="text-3xl font-bold text-gray-900">
                {tickets.length}
              </p>
            </div>
            <div className="bg-white w-full mt-3 px-4 py-3 space-y-5 rounded-xl hover:shadow-lg transition-shadow">
              <CircleDot className="w-8 h-8 text-green-600  rounded-lg" />
              <p className=" text-gray-600">Open Tickets</p>
              <p className="text-3xl font-bold text-gray-900">
                {tickets.filter((ticket) => ticket.status === "open").length}
              </p>
            </div>
            <div className="bg-white w-full mt-3 px-4 py-3 space-y-5 rounded-xl hover:shadow-lg transition-shadow">
              <Clock className="w-8 h-8 text-orange-500  rounded-lg" />
              <p className=" text-gray-600">In Progress</p>
              <p className="text-3xl font-bold text-gray-900">
                {
                  tickets.filter((ticket) => ticket.status === "inProgress")
                    .length
                }
              </p>
            </div>
            <div className="bg-white w-full px-4 py-3 mt-3 space-y-5 rounded-xl hover:shadow-lg transition-shadow">
              <CircleCheck className="w-8 h-8 text-gray-700  rounded-lg" />
              <p className=" text-gray-600">Closed Tickets</p>
              <p className="text-3xl font-bold text-gray-900">
                {tickets.filter((ticket) => ticket.status === "closed").length}
              </p>
            </div>
          </div>
          <div className="my-10 flex items-center justify-center w-full">
            <Link to="/ticketmgt">
              <button className="bg-blue-600 text-white px-6 font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Manage Tickets
              </button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Dashboard;
