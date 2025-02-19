import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <section className=" py-16 px-4 w-11/12 mx-auto">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold  mb-8">About Us</h2>
        <p className="text-lg mb-6">
          Welcome to <span className="font-semibold text-indigo-600">Product Hunt</span>, your go-to platform for discovering, sharing, and upvoting the best new products in the market. Our mission is to connect product enthusiasts with the latest innovations and trends in the tech world.
        </p>
        <p className="text-lg mb-6">
          At <span className="font-semibold text-indigo-600">Product Hunt</span>, we believe in the power of community and the importance of staying updated with the latest products. Whether you're a tech enthusiast, a startup founder, or just someone looking for the next big thing, we've got you covered.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12">
          {/* Card for Our Mission */}
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
            <p className="text-lg text-gray-600">
              Our mission is to create a platform where users can discover and share the best new products. We aim to provide a space where product enthusiasts can connect, share their insights, and stay updated with the latest trends in the tech world.
            </p>
          </motion.div>

          {/* Card for Why Choose Us */}
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Us?</h3>
            <ul className="list-disc pl-6 text-lg text-gray-600">
              <li>Discover the latest products in the market.</li>
              <li>Connect with a community of product enthusiasts.</li>
              <li>Share your insights and upvote your favorite products.</li>
              <li>Stay updated with the latest trends and innovations.</li>
            </ul>
          </motion.div>
        </div>

        <div className="mt-12">
          <p className="text-lg">
            Whether you're looking for the latest tech gadgets, innovative startups, or just want to stay updated with the latest trends, <span className="font-semibold text-indigo-600">Product Hunt</span> is the place for you. Join our community today and start discovering the best new products.
          </p>
        </div>

        {/* Card for Contact Us */}
        <motion.div
          className="mt-8 bg-white p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h4 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h4>
          <p className="text-lg text-gray-600">
            For inquiries, feedback, or assistance, don't hesitate to reach out to us at{" "}
            <span className="text-indigo-600">contact@producthunt.com</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
