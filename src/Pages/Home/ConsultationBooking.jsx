import { useState } from "react";

const specialists = [
  {
    name: "Dr. Ayesha Rahman",
    specialty: "Nutritionist & Dietitian",
    image:
      "https://i.postimg.cc/J7fQLfHc/360-F-472164755-Her4lvdu74u85ezegfz-PEZqm09w-Mkkv9.jpg",
    bookingLink: "/book/ayesha-rahman",
  },
  {
    name: "Mr. Tanvir Ahmed",
    specialty: "Fitness Coach",
    image: "https://i.postimg.cc/0yQjHQ5t/istockphoto-1562983249-612x612.jpg",
    bookingLink: "/book/tanvir-ahmed",
  },
  {
    name: "Dr. Sabrina Noor",
    specialty: "Food Safety Expert",
    image:
      "https://i.postimg.cc/zXkHc6Cf/medical-concept-indian-doctor-uniform-600nw-2313987627.jpg",
    bookingLink: "/book/sabrina-noor",
  },
  {
    name: "Ms. Farzana Khan",
    specialty: "Wellness Consultant",
    image: "https://i.postimg.cc/nh07CgrW/1.jpg",
    bookingLink: "/book/farzana-khan",
  },
];

const ConsultationBooking = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto text-center mb-14 px-4 sm:px-0">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
          Book a Session with Our{" "}
          <span className="text-sky-600">Specialists</span>
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-gray-600 dark:text-gray-400 text-base sm:text-lg leading-relaxed">
          Get personalized guidance on nutrition, wellness, and food safety by
          booking a one-on-one consultation with our certified experts.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-0">
        {specialists.map(({ name, specialty, image, bookingLink }, index) => (
          <div
            key={index}
            className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col"
          >
            <img
              src={image}
              alt={name}
              className="w-full h-56 object-cover"
              loading="lazy"
            />
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                {name}
              </h3>
              <p className="text-sky-600 font-medium mb-4">{specialty}</p>
              <a
                href={bookingLink}
                className="mt-auto inline-block text-center bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-full font-semibold shadow-md transition duration-300"
                aria-label={`Book a session with ${name}`}
              >
                Book Session
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ConsultationBooking;
