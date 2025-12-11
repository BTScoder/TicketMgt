import { Ticket, Users, Shield } from "lucide-react";
const Features = () => {
  const features = [
    {
      title: "Easy Ticket Management",
      desc: "Create, update, and track tickets with an intuitive interface designed for efficiency.",
      icon: Ticket,
    },
    {
      title: "Lightning Fast ",
      desc: "Built with modern technologies for optimal performance and seamless user experience.",
      icon: Users,
    },
    {
      title: "Secure & Reliable",
      desc: "Your data is protected with industry-standard security measures and best practices.",
      icon: Shield,
    },
  ];
  return (
    <>
      <div className="px-4 py-10 space-y-8">
        <h1 className="text-4xl font-bold text-center">
          Why Choose TicketFlow?
        </h1>
        {/* Svg circle */}
        <div></div>
        {/* Features */}
        <div className="md:flex md:items-center md:justify-center md:gap-6  space-x-2 md:space-y-0 space-y-4">
          {features.map((feature, index) => (
            <div
              className="flex flex-col space-y-4 items-center py-10 px-4 rounded-lg hover:scale-105 transition-transform shadow-2xl duration-300  "
              key={index}
            >
              <feature.icon size={48} className="text-blue-600" />
              <h2 className="text-2xl ">{feature.title}</h2>
              <p className="text-center text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Features;
