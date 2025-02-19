import { Calendar, Timer } from "lucide-react";

const upcomingLaunches = [
  {
    name: "NextGen AI Assistant",
    launchDate: "March 5, 2025",
    description: "An advanced AI chatbot for productivity and automation.",
    image: "https://ph-files.imgix.net/62c941ee-5f84-402d-bd7f-e5393ad021fa.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=56&h=56&fit=crop&frame=1&dpr=2",
  },
  {
    name: "Crypto Wallet X",
    launchDate: "March 12, 2025",
    description: "A secure and fast crypto wallet with Web3 integration.",
    image: "https://ph-files.imgix.net/8e29421a-81e3-4220-87c4-57f07eb3ab86.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=56&h=56&fit=crop&frame=1&dpr=2",
  },
  {
    name: "DesignPro 2.0",
    launchDate: "March 20, 2025",
    description: "A powerful design tool for creatives and professionals.",
    image: "https://ph-files.imgix.net/016679c7-a274-4a9c-8ca0-c0c0d5bb8029.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=56&h=56&fit=crop&frame=1&dpr=2",
  },
];

const UpcomingLaunches = () => {
  return (
    <div className="bg-blue-50 py-12 px-6 w-11/12 mx-auto">
      <div className="">
        <h2 className="text-3xl font-bold text-gray-900">Upcoming Launches</h2>
      </div>

      <div className="mt-8 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
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
