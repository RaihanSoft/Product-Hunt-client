import { useContext, useEffect, useState } from "react";
import { Context } from "../Provider/Provider";
import axios from "axios";
import { WithContext as ReactTags } from "react-tag-input";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useAxiosSecure from '../../UseAxiosSecure/UseAxiosSecure';
import { toast } from 'react-toastify';

const AddProduct = () => {
    const { user } = useContext(Context);
    const [productName, setProductName] = useState("");
    const [productImage, setProductImage] = useState(null);
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);
    const [externalLink, setExternalLink] = useState("");
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [payment, setPayment] = useState([]);
    const [status, setStatus] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axiosSecure.get(`/myPayment?email=${user.email}`);
                setPayment(response.data || []);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching payments:', error);
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchPayments();
        }
    }, [user, axiosSecure]);

    useEffect(() => {
        if (payment.length > 0) {
            const statusFromPayment = payment[0].status;
            setStatus(statusFromPayment);
        }
    }, [payment]);

    const handleAddition = (tag) => {
        setTags([...tags, tag]);
    };

    const handleDelete = (i) => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!productImage) {
            setErrorMessage("Please upload a product image.");
            return;
        }

        // Check if user already has a product
        const existingProductResponse = await axiosSecure.get(`/myProducts?email=${user.email}`);
        if (existingProductResponse.data.length > 0 && status !== "succeeded") {
            setErrorMessage("You cannot add more products until your payment is succeeded.");
            return;
        }

        
            const formData = new FormData();
            formData.append("file", productImage);
            formData.append("upload_preset", "test-one");
            formData.append("cloud_name", "dvyv0emmq");

            // Upload image to Cloudinary
            const cloudinaryResponse = await axios.post(
                "https://api.cloudinary.com/v1_1/dvyv0emmq/image/upload",
                formData
            );
            const imageUrl = cloudinaryResponse.data.secure_url;

            const productData = {
                name: productName,
                image: imageUrl,
                description,
                ownerName: user?.displayName || "Unknown User",
                ownerImage: user?.photoURL || "",
                ownerEmail: user?.email || "Unknown Email",
                tags: tags.map((tag) => tag.text),
                externalLink,
                timestamp: new Date(),
                votes: [],
                voteCount: 0,
                status: "pending",
            };

            // Add product to the database
            const response = await axios.post("https://product-hunt-server-green.vercel.app/products", productData);
            console.log(response);
            toast.success("Product added successfully!");
            navigate("/dashboard/my-products");

            // Fetch the updated payment status
            const paymentResponse = await axiosSecure.get(`/myPayment?email=${user.email}`);
            setPayment(paymentResponse.data || []);
            if (paymentResponse.data?.[0]?.status !== "succeeded") {
                setStatus(paymentResponse.data[0].status);
                setErrorMessage("Your payment status has changed. You cannot add more products.");
            } else {
                setErrorMessage("");
                navigate("/dashboard/my-products");
            }
     
    };

    if (loading) return <div>Loading...</div>;

    if (!user) {
        return (
            <div className="text-center text-gray-600 dark:text-gray-300">
                <p>Loading user data...</p>
            </div>
        );
    }

    return (
        <div className="add-product-container p-6 lg:p-12 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg">
            <motion.h2
                className="text-3xl lg:text-4xl font-bold mb-8 text-indigo-600 dark:text-indigo-400"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Add Product
            </motion.h2>

            <div className="owner-details flex items-center justify-center gap-4 mb-8">
                <img
                    src={user.photoURL}
                    alt="User"
                    className="w-16 h-16 rounded-full shadow-lg border-2 border-indigo-600"
                />
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        {user.displayName}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
                </div>
            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-6 lg:space-y-8 max-w-3xl mx-auto"
            >
                <div className="form-group">
                    <label className="block mb-2 text-gray-700 dark:text-gray-300 font-semibold">
                        Product Name
                    </label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                        className="input-field"
                    />
                </div>

                <div className="form-group">
                    <label className="block mb-2  dark:text-gray-300 font-semibold">
                        Product Image
                    </label>
                    <input
                        type="file"
                        onChange={(e) => setProductImage(e.target.files[0])}
                        required
                        className="input-field text-gary-700 dark:text-gray-300"
                    />
                </div>

                <div className="form-group">
                    <label className="block mb-2 text-gray-700 dark:text-gray-300 font-semibold">
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="input-field"
                        rows="4"
                    ></textarea>
                </div>

                <div className="form-group">
                    <label className="block mb-2 text-white font-semibold">
                        Tags
                    </label>
                    <ReactTags
                        tags={tags}
                        handleDelete={handleDelete}
                        handleAddition={handleAddition}
                        classNames={{
                            tags: "react-tags",
                            tagInput: "react-tags__input",
                            tag: "react-tags__tag",
                            remove: "react-tags__remove",
                        }}
                    />
                </div>

                <div className="form-group">
                    <label className="block mb-2 text-gray-700 dark:text-gray-300 font-semibold">
                        External Link
                    </label>
                    <input
                        type="url"
                        value={externalLink}
                        onChange={(e) => setExternalLink(e.target.value)}
                        className="input-field"
                    />
                </div>

                {errorMessage && (
                    <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
                )}

                <div className="text-center">
                    <motion.button
                        type="submit"
                        className="bg-[#684DF4]  text-white font-semibold px-6 py-3 rounded-lg transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Submit
                    </motion.button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
