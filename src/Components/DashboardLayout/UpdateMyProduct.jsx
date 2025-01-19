import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../UseAxiosSecure/UseAxiosSecure";
import { WithContext as ReactTags } from "react-tag-input";

const UpdateMyProduct = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        tags: [],
        externalLink: "",
        voteCount: 0,
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axiosSecure.get(`/products/${productId}`);
                const product = response.data;
                setFormData({
                    name: product.name || "",
                    description: product.description || "",
                    tags: product.tags?.map((tag) => ({ id: tag, text: tag })) || [],
                    externalLink: product.externalLink || "",
                    voteCount: product.voteCount || 0,
                });
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product:", error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId, axiosSecure]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddition = (tag) => {
        setFormData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
    };

    const handleDelete = (i) => {
        setFormData((prev) => ({ ...prev, tags: prev.tags.filter((_, index) => index !== i) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedData = {
            name: formData.name,
            description: formData.description,
            tags: formData.tags.map((tag) => tag.text),
            externalLink: formData.externalLink,
        };

        try {
            await axiosSecure.put(`/products/${productId}`, updatedData);
            alert("Product updated successfully!");
            navigate("/dashboard/my-products");
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Update Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 text-gray-600">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 text-gray-600">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2"
                        rows="4"
                        placeholder="Enter a detailed description of the product"
                    ></textarea>
                </div>
                <div>
                    <label className="block mb-1 text-gray-600">Tags</label>
                    <ReactTags
                        tags={formData.tags}
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
                <div>
                    <label className="block mb-1 text-gray-600">External Link</label>
                    <input
                        type="url"
                        name="externalLink"
                        value={formData.externalLink}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2"
                        placeholder="Enter a related external link"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default UpdateMyProduct;
