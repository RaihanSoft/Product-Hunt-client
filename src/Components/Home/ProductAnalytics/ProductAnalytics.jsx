import { BarChart, TrendingUp } from "lucide-react";

const productAnalytics = [
  {
    name: "AI Writer Pro",
    upvotes: 450,
    productLaunchDate: "Jan 15, 2025",
  },
  {
    name: "DesignTool X",
    upvotes: 350,
    productLaunchDate: "Feb 3, 2025",
  },
  {
    name: "Crypto Wallet X",
    upvotes: 300,
    productLaunchDate: "Feb 18, 2025",
  },
  {
    name: "Web3 Framework",
    upvotes: 500,
    productLaunchDate: "Jan 25, 2025",
  },
];

const ProductAnalytics = () => {
  return (
    <div className=" py-12 px-6 w-11/12 mx-auto">
      <div className="">
        <h2 className="text-3xl font-bold">Product Analytics</h2>
      </div>

      <div className="mt-8 grid lg:grid-cols-2 sm:grid-cols-1 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-900">Top Products by Upvotes</h3>
          <ul className="mt-4 space-y-3">
            {productAnalytics.map((product, index) => (
              <li key={index} className="flex justify-between items-center">
                <div className="flex items-center">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span className="ml-2 text-gray-700">{product.name}</span>
                </div>
                <span className="font-bold text-gray-800">{product.upvotes} Upvotes</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-900">Launch Trends (This Week)</h3>
          <div className="mt-4">
            <BarChart className="text-blue-500" size={40} />
            <p className="text-gray-700 mt-2">Graph showing the upvotes for top products launched this week.</p>
            {/* You can add a chart component here or display data visually */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAnalytics;
