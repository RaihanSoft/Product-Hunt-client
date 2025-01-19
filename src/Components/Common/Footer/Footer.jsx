import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:justify-between items-center">
          {/* Logo and Website Name */}
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <img
              src="/path/to/logo.png"
              alt="Website Logo"
              className="w-24 h-auto mb-2 mx-auto sm:mx-0"
            />
            <h2 className="text-xl font-semibold">Website Name</h2>
          </div>

          {/* Contact Information */}
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <p className="mb-2">Contact Us:</p>
            <p>Email: support@website.com</p>
            <p>Phone: +1 234 567 890</p>
          </div>

          {/* Address */}
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <p className="mb-2">Address:</p>
            <p>1234 Main St, City, Country</p>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center sm:justify-start space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-600"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-700"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-6">
          <p>&copy; {new Date().getFullYear()} Website Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
