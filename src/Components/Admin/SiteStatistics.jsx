import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import useAxiosSecure from "../../UseAxiosSecure/UseAxiosSecure";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const SiteStatistics = () => {
    const axiosSecure = useAxiosSecure();
    const [data, setData] = useState({
        products: 0,
        acceptedProducts: 0,
        pendingProducts: 0,
        reviews: 0,
        users: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsResponse = await axiosSecure.get("/all-products");
                const reviewsResponse = await axiosSecure.get("/reviews");
                const usersResponse = await axiosSecure.get("/users");

                const acceptedProducts = productsResponse.data.filter(product => product.status === "accepted").length;
                const pendingProducts = productsResponse.data.filter(product => product.status === "pending").length;

                setData({
                    products: productsResponse.data.length,
                    acceptedProducts,
                    pendingProducts,
                    reviews: reviewsResponse.data.length,
                    users: usersResponse.data.length,
                });
            } catch (error) {
                console.error("Error fetching site statistics:", error);
            }
        };

        fetchData();
    }, [axiosSecure]);

    const chartData = {
        labels: ["Total Products", "Accepted Products", "Pending Products", "Reviews", "Users"],
        datasets: [
            {
                label: "Site Statistics",
                data: [data.products, data.acceptedProducts, data.pendingProducts, data.reviews, data.users],
                backgroundColor: [
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(153, 102, 255, 0.6)",
                ],
                borderColor: [
                    "rgba(75, 192, 192, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(255, 99, 132, 1)",
                    "rgba(153, 102, 255, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            tooltip: {
                enabled: true,
            },
        },
        animation: {
            animateRotate: true,
            animateScale: true,
            duration: 1500,
            easing: "easeOutElastic",
        },
    };

    return (
        <div className="p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Site Statistics</h2>
            
            {/* Display statistics with enhanced styles */}
            <div className="grid grid-cols-2 gap-6 mb-8">
                <p className="text-lg font-semibold text-gray-700 hover:text-blue-500 transition-all duration-300 transform hover:scale-105">
                    <span className="text-indigo-600">Total Products:</span> {data.products}
                </p>
                <p className="text-lg font-semibold text-gray-700 hover:text-blue-500 transition-all duration-300 transform hover:scale-105">
                    <span className="text-indigo-600">Accepted Products:</span> {data.acceptedProducts}
                </p>
                <p className="text-lg font-semibold text-gray-700 hover:text-blue-500 transition-all duration-300 transform hover:scale-105">
                    <span className="text-indigo-600">Pending Products:</span> {data.pendingProducts}
                </p>
                {/* <p className="text-lg font-semibold text-gray-700 hover:text-blue-500 transition-all duration-300 transform hover:scale-105">
                    <span className="text-indigo-600">Reviews:</span> {data.reviews}
                </p> */}
                <p className="text-lg font-semibold text-gray-700 hover:text-blue-500 transition-all duration-300 transform hover:scale-105">
                    <span className="text-indigo-600">Users:</span> {data.users}
                </p>
            </div>

            {/* Pie Chart */}
            <div className="w-full max-w-md mx-auto">
                <Pie data={chartData} options={options} />
            </div>
        </div>
    );
};

export default SiteStatistics;
