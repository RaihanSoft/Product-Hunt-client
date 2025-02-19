import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "John Doe",
    role: "Product Manager",
    feedback: "This platform helped me discover amazing tech tools! The upvoting system is fantastic.",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    rating: 5,
  },
  {
    name: "Sarah Lee",
    role: "Startup Founder",
    feedback: "Submitting my product was seamless. The exposure I received was incredible!",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    rating: 4,
  },
  {
    name: "Michael Smith",
    role: "Software Engineer",
    feedback: "A great place to find innovative products. The community engagement is top-notch!",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    rating: 5,
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  const prevTestimonial = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-gray-100 py-12 px-4 w-11/12 mx-auto sm:px-6 lg:px-8">
      <div className="">
        <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
      </div>

      <div className="relative mt-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
          <img
            src={testimonials[index].image}
            alt={testimonials[index].name}
            className="mx-auto w-20 h-20 rounded-full border-4 border-gray-200"
          />
          <p className="mt-4 text-gray-700 italic">"{testimonials[index].feedback}"</p>
          <div className="flex justify-center mt-3">
            {[...Array(testimonials[index].rating)].map((_, i) => (
              <Star key={i} className="text-yellow-400 w-5 h-5" fill="currentColor" />
            ))}
          </div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">{testimonials[index].name}</h3>
          <p className="text-sm text-gray-500">{testimonials[index].role}</p>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevTestimonial}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-200 hover:bg-blue-300 p-2 rounded-full shadow-md"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <button
          onClick={nextTestimonial}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-200 hover:bg-blue-300 p-2 rounded-full shadow-md"
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
