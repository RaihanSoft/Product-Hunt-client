import { Calendar, Timer } from "lucide-react";

const upcomingLaunches = [
  {
    name: "NextGen AI Assistant",
    launchDate: "March 5, 2025",
    description: "An advanced AI chatbot for productivity and automation.",
    image: "https://source.unsplash.com/400x300/?ai,robot",
  },
  {
    name: "Crypto Wallet X",
    launchDate: "March 12, 2025",
    description: "A secure and fast crypto wallet with Web3 integration.",
    image: "https://source.unsplash.com/400x300/?crypto,blockchain",
  },
  {
    name: "DesignPro 2.0",
    launchDate: "March 20, 2025",
    description: "A powerful design tool for creatives and professionals.",
    image: "https://source.unsplash.com/400x300/?design,creativity",
  },
];

const UpcomingLaunches = () => {
  return (
    <div className="bg-white py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900">🚀 Upcoming Launches</h2>
        <p className="mt-2 text-lg text-gray-600">Get ready for the next big things!</p>
      </div>

      <div className="mt-8 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 max-w-5xl mx-auto">
        {upcomingLaunches.map((product, index) => (
          <div
            key={index}
            className="bg-gray-100 p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition cursor-pointer"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="mt-4 text-lg font-semibold text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.description}</p>
            <p className="mt-2 text-gray-700 flex justify-center items-center">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span className="ml-1">{product.launchDate}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingLaunches;
