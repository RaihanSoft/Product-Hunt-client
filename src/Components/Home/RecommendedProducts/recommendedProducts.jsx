import { Heart, Tag } from "lucide-react";

const recommendedProducts = [
  {
    name: "DevOps Toolkit",
    description: "A comprehensive set of tools to improve your DevOps workflows.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbXLIgu5koL1-5d12P8A9NiPEQQ8pHTBbcPHpnGPTbue2DJeWPPQSrFuVNbpZJsmFN0e0&usqp=CAUs",
    category: "Developer Tools",
  },
  {
    name: "TimeTracker Pro",
    description: "Track your time and optimize productivity with this smart app.",
    image: "data:image/png;base64,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",
    category: "Productivity",
  },
  {
    name: "AI-Powered Chatbot",
    description: "An intelligent chatbot that helps automate customer service.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuRHLIeDGmjBdQmQxboiuVojm83MbYEdS87oaVNmGWcUOzOF4ktqepb0b7Hkvc2-_-a-M&usqp=CAU",
    category: "AI & Machine Learning",
  },
];

const ProductRecommendations = () => {
  return (
    <div className=" py-12 px-6 w-11/12 mx-auto">
      <div className="">
        <h2 className="text-3xl font-bold">Product Recommendations</h2>
      </div>

      <div className="mt-8 grid md:grid-cols-3 sm:grid-cols-1 gap-6">
        {recommendedProducts.map((product, index) => (
          <div
            key={index}
            className="bg-blue-50 p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition cursor-pointer"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="mt-4 text-lg font-semibold text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.description}</p>
            <div className="mt-2 text-gray-700 flex justify-center items-center">
              <Tag className="w-4 h-4 text-blue-500" />
              <span className="ml-1 text-gray-500">{product.category}</span>
            </div>
            <div className="mt-4 flex justify-center items-center text-red-500">
              <Heart className="w-5 h-5" />
              <span className="ml-2 font-semibold">Loved by users!</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductRecommendations;
