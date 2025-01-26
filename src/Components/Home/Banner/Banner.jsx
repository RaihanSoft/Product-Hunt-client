import { Card, CardContent } from "@mui/material";
import logo from "../../assets/ph.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Banner = () => {
  const navigate = useNavigate()
  return (
    <div className="relative">
      {/* Purple Background with Polygon Shape */}
      <div
        style={{
          clipPath: "polygon(76% 0, 100% 0, 100% 100%, 45% 100%)",
        }}
        className="bg-[#684DF4] w-full h-[550px]"
      ></div>

      {/* Content Section */}
      <div className=" items-center absolute top-0 left-0 w-full h-full flex flex-col md:flex-row  justify-center px-8 md:px-16 lg:px-32 lg:-ml-16 text-black">
        <div className="flex-1 lg:-mt-20 ">
          <motion.h1
            className="text-4xl font-bold mb-4 text-black"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Discover the Best Products on{" "}
            <motion.span
              className="text-[#684DF4]"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              Product Hunt
            </motion.span>
          </motion.h1>
          <p className="text-lg mb-8">
            Your go-to platform for finding the latest and greatest products in the market.
          </p>
        </div>

        {/* Card */}

        <div className="flex-1 flex justify-end">
          <motion.div
            className="w-full max-w-lg"
            animate={{
              y: [0, -10, 0], // Moves up and down
            }}
            transition={{
              duration: 2, // Duration of one cycle
              repeat: Infinity, // Repeats forever
              repeatType: "loop", // Restarts the animation smoothly
              ease: "easeInOut", // Smooth easing
            }}
          >
            <Card className="w-full bg-white shadow-lg rounded-2xl">
              <CardContent>
                <div className="flex items-center mb-4">
                  {/* Logo */}
                  <div className="border-2 border-purple-100 w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold">
                    <img src={logo} alt="" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-xl font-semibold">Product Hunt</h2>
                    <p className="text-sm text-gray-600">
                      Discover, share, and upvote the best new products.
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  Join our community of product enthusiasts and stay updated with the latest trends and innovations in the tech world.
                </p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex gap-2">
                    <span className="bg-gray-100 px-3 py-1 rounded-lg">Startups</span>
                    <span className="bg-gray-100 px-3 py-1 rounded-lg">Innovation</span>
                  </div>

                  <motion.button
                    whileHover={{
                      scale: 1.02, // Slightly enlarge the button on hover
                      boxShadow: "0px 10px 20px rgba(104, 77, 244, 0.3)", // Add a soft shadow on hover
                    }}
                    whileTap={{
                      scale: 0.95, // Slightly shrink the button when tapped
                    }}
                    className="bg-[#684DF4] text-white px-2 md:px-4 py-2 rounded-lg text-sm font-semibold"
                    onClick={() => navigate("/products")}
                  >
                    Explore Now
                  </motion.button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>;

      </div>
    </div>
  );
};

export default Banner;
