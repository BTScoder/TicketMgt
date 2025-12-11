import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <>
      <div className="relative  bg-[#c7d5f8]">
        {/* Main Content Section */}
        <div className="relative bg-linear-to-b from-slate-50 to-slate-100 pb-32">
          {/* Written Content */}
          <div className="max-w-6xl mx-auto px-6 pt-20 text-center">
            <h1 className="text-6xl font-bold mb-6">
              Welcome to <span className="text-blue-600">TicketFlow</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Streamline your ticket management with powerful tools and
              intuitive workflows
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/login">
                <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                  Get Started
                </button>
              </Link>
            </div>
          </div>

          {/* Wave SVG */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg
              className="relative block w-full h-34"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,50 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z"
                className="fill-blue-600"
              />
            </svg>
          </div>
        </div>

        {/* Blue Section Below Wave */}
        <div className="bg-blue-600 h-30"></div>
      </div>
    </>
  );
};

export default Hero;
