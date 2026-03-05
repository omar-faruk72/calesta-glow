import React from "react";
import { FiUser, FiMail, FiMessageSquare } from "react-icons/fi";

const ContactSection = () => {
  return (
    <section className="w-full bg-white py-16 px-4 md:px-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Side */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Contact Us
          </h1>

          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Get in Touch
          </h3>

          <p className="text-gray-500 mb-8 max-w-md">
            Have a question or need assistance? Fill out the form below and
            our team will get back to you as soon as possible.
          </p>

          <form className="space-y-6">

            {/* Name */}
            <div className="relative">
              <FiUser className="absolute left-3 top-4 text-gray-400" />
              <input
                type="text"
                placeholder="Your Name"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <FiMail className="absolute left-3 top-4 text-gray-400" />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>

            {/* Message */}
            <div className="relative">
              <FiMessageSquare className="absolute left-3 top-4 text-gray-400" />
              <textarea
                rows="5"
                placeholder="How can we help?"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
              ></textarea>
            </div>

            <button
              type="submit"
              className="px-8 py-3 rounded-full border border-black hover:bg-black hover:text-white transition duration-300"
            >
              Let Us Know
            </button>

          </form>
        </div>

        {/* Right Side Image */}
        <div className="w-full">
          <img
            src="https://res.cloudinary.com/dn5t9fhya/image/upload/v1772705895/fa888ffce8646c02edc990ef7cc824efa3eae945_ddong6.jpg"
            alt="product"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </section>
  );
};

export default ContactSection;