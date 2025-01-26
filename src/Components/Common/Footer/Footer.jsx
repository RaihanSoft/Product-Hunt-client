import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from "../../assets/ph.png";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 mt-16 px-10">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between items-center border-b border-gray-600 pb-6">
          {/* Logo and Website Name */}
          <div className="text-center sm:text-left mb-6 sm:mb-0">
            <img
              src={logo}
              alt="Website Logo"
              className="w-24 h-auto mb-2 mx-auto sm:mx-0"
            />
            <h2 className="text-xl font-semibold">Products Hunt</h2>
          </div>

          {/* Contact Information */}
          <div className="text-center sm:text-left mb-6 sm:mb-0">
            <h3 className="text-lg font-medium mb-2">Contact Us</h3>
            <p>Email: support@website.com</p>
            <p>Phone: +1 234 567 890</p>
          </div>

          {/* Address */}
          <div className="text-center sm:text-left mb-6 sm:mb-0">
            <h3 className="text-lg font-medium mb-2">Address</h3>
            <p>1234 Main St</p>
            <p>City, Country</p>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center sm:justify-start space-x-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
              aria-label="Facebook"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-600"
              aria-label="Twitter"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-700"
              aria-label="Instagram"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

        {/* Divider */}

        {/* Copyright */}
        <div className="text-center mt-6">
          <p>&copy; {new Date().getFullYear()} Products Hunt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
