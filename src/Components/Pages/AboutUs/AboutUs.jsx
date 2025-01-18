const AboutUs = () => {
  return (
    <section className="bg-gray-50 py-16 px-4 w-11/12 mx-auto ">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">About Us</h2>
        <p className="text-lg text-gray-600 mb-6">
          Welcome to <span className="font-semibold text-indigo-600">Modern Hotel Booking Platform</span>, your
          go-to destination for booking the best hotels with ease and convenience. Our platform is designed to offer you a
          seamless experience when planning your travels, whether you&apos;'re looking for a luxury stay, a budget-friendly option,
          or something in between.
        </p>
        <p className="text-lg text-gray-600 mb-6">
          At <span className="font-semibold text-indigo-600">Modern Hotel Booking Platform</span>, we understand that
          choosing the right place to stay is crucial to making your trip memorable. That&apos;'s why we partner with the finest
          hotels to provide you with a wide variety of choices, ensuring you find the perfect accommodation based on your
          preferences and budget.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12">
          {/* Card for Our Mission */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
            <p className="text-lg text-gray-600">
              Our mission is simple: to make hotel booking as easy, quick, and reliable as possible. Whether you're traveling
              for business, leisure, or a special occasion, we aim to provide you with an intuitive and user-friendly platform
              that helps you book the perfect hotel in just a few clicks.
            </p>
          </div>

          {/* Card for Why Choose Us */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Us?</h3>
            <ul className="list-disc pl-6 text-lg text-gray-600">
              <li>Wide Selection: From luxurious resorts to cozy budget hotels, we offer a diverse selection of accommodations.</li>
              <li>Seamless Experience: Our platform ensures a smooth and hassle-free booking process.</li>
              <li>Best Prices: Competitive prices ensuring the best deals for your stay.</li>
              <li>Customer Support: Our dedicated support team assists you every step of the way.</li>
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <p className="text-lg text-gray-600">
            Whether you&apos;'re planning a weekend getaway or an extended vacation, we’re here to help you find the perfect place to stay. 
            Start browsing today and book your next stay with <span className="font-semibold text-indigo-600">Modern Hotel Booking Platform</span> — 
            your travel experience begins here.
          </p>
        </div>

        {/* Card for Contact Us */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h4>
          <p className="text-lg text-gray-600">
            For inquiries, feedback, or assistance, don&apos;t hesitate to reach out to us at{" "}
            <span className="text-indigo-600">contact@modernhotelbooking.com</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
