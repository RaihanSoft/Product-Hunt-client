import { Star } from "lucide-react";

const makers = [
  {
    name: "John Doe",
    role: "Founder of TechFlow",
    products: 5,
    image: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    name: "Sarah Lee",
    role: "Creator of AI Helper",
    products: 3,
    image: "https://randomuser.me/api/portraits/women/11.jpg",
  },
  {
    name: "Michael Smith",
    role: "CEO of DevTools",
    products: 7,
    image: "https://randomuser.me/api/portraits/men/12.jpg",
  },
];

const FeaturedMakers = () => {
  return (
    <div className="bg-gray-100 py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900">Featured Makers</h2>
        <p className="mt-2 text-lg text-gray-600">Meet the innovators shaping the future</p>
      </div>

      <div className="mt-8 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 max-w-5xl mx-auto">
        {makers.map((maker, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition"
          >
            <img
              src={maker.image}
              alt={maker.name}
              className="mx-auto w-20 h-20 rounded-full border-4 border-gray-200"
            />
            <h3 className="mt-4 text-lg font-semibold text-gray-900">{maker.name}</h3>
            <p className="text-sm text-gray-500">{maker.role}</p>
            <p className="mt-2 text-gray-700 flex justify-center items-center">
              <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
              <span className="ml-1">{maker.products} Products Launched</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedMakers;
