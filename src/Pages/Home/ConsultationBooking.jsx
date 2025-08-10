import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  FiCalendar,
  FiStar,
  FiChevronRight,
  FiChevronLeft,
} from "react-icons/fi";

const ConsultationBooking = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const specialists = [
    {
      name: "Dr. Ayesha Rahman",
      specialty: "Nutritionist & Dietitian",
      image:
        "https://i.postimg.cc/J7fQLfHc/360-F-472164755-Her4lvdu74u85ezegfz-PEZqm09w-Mkkv9.jpg",
      experience: "12 years",
      rating: 4.9,
      bio: "Specializes in sustainable nutrition plans to reduce food waste while maintaining balanced diets.",
    },
    {
      name: "Mr. Tanvir Ahmed",
      specialty: "Fitness Coach",
      image: "https://i.postimg.cc/0yQjHQ5t/istockphoto-1562983249-612x612.jpg",
      experience: "8 years",
      rating: 4.8,
      bio: "Helps clients optimize their meal plans for fitness goals while minimizing unnecessary consumption.",
    },
  ];

  const testimonials = [
    {
      quote:
        "Dr. Rahman helped me reduce my grocery waste by 40% while improving my family's nutrition.",
      author: "Fatima K.",
      rating: 5,
      role: "Home Chef",
    },
    {
      quote:
        "Tanvir's meal planning strategies saved me both time and money at the supermarket each week.",
      author: "Rahim M.",
      rating: 5,
      role: "Fitness Enthusiast",
    },
    {
      quote:
        "The consultation completely changed how I view food storage and expiration dates.",
      author: "Nusrat J.",
      rating: 4,
      role: "Busy Parent",
    },
    {
      quote:
        "I've cut my food expenses by 30% without sacrificing quality thanks to these sessions.",
      author: "Karim S.",
      rating: 5,
      role: "College Student",
    },
    {
      quote:
        "The waste reduction techniques helped our restaurant improve profitability significantly.",
      author: "Tahmina A.",
      rating: 5,
      role: "Restaurant Owner",
    },
    {
      quote:
        "My energy levels improved dramatically after following the personalized nutrition plan.",
      author: "Javed I.",
      rating: 4,
      role: "Office Worker",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleBooking = (specialistName) => {
    if (user) {
      Swal.fire({
        title: "Booking Request Sent!",
        html: `Our team will contact you shortly to schedule your session with <b>${specialistName}</b>.`,
        icon: "success",
        confirmButtonText: "Got it!",
        confirmButtonColor: "#0ea5e9",
      });
    } else {
      Swal.fire({
        title: "Login Required",
        text: "You need to login to book a consultation session.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Login Now",
        confirmButtonColor: "#0ea5e9",
        cancelButtonText: "Cancel",
        cancelButtonColor: "#ef4444",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-700 py-10 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-sm font-medium rounded-full bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200 mb-4">
            Expert Guidance
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Personalized{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-sky-600">
              Consultations
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get one-on-one advice from our specialists to optimize your food
            habits, reduce waste, and improve nutrition.
          </p>
        </div>

        {/* Specialist Profiles */}
        <div className="flex flex-col lg:flex-row gap-12 mb-24">
          {specialists.map((specialist, index) => (
            <div key={index} className="flex-1">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="relative group flex-shrink-0">
                  <img
                    src={specialist.image}
                    alt={specialist.name}
                    className="w-48 h-48 rounded-2xl object-cover shadow-lg border-4 border-white dark:border-gray-800 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
                    <FiStar className="text-yellow-400" />
                    <span className="font-medium text-gray-800 dark:text-white">
                      {specialist.rating}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="mb-2">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {specialist.name}
                    </h3>
                    <p className="text-sky-600 dark:text-sky-400 font-medium">
                      {specialist.specialty}
                    </p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {specialist.bio}
                  </p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleBooking(specialist.name)}
                      className="inline-flex cursor-pointer items-center gap-2 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                    >
                      <FiCalendar />
                      Book Session
                    </button>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {specialist.experience} experience
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Carousel */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 dark:border-gray-700 mb-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Success Stories
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Hear from people who transformed their food habits with our
                guidance
              </p>
            </div>

            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentTestimonialIndex * 100}%)`,
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-gray-50 dark:bg-gray-700/30 p-8 rounded-xl">
                      <div className="flex items-center justify-center mb-6">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={`w-6 h-6 mx-1 ${
                              i < testimonial.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300 dark:text-gray-500"
                            }`}
                          />
                        ))}
                      </div>
                      <blockquote className="text-center mb-6">
                        <p className="text-xl italic text-gray-700 dark:text-gray-300">
                          "{testimonial.quote}"
                        </p>
                      </blockquote>
                      <div className="text-center">
                        <p className="font-bold text-gray-900 dark:text-white">
                          {testimonial.author}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition z-10"
                aria-label="Previous testimonial"
              >
                <FiChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>

              <button
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition z-10"
                aria-label="Next testimonial"
              >
                <FiChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonialIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonialIndex
                      ? "bg-sky-600"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to transform your food habits?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Our specialists are here to help you achieve your nutrition and
            sustainability goals.
          </p>
          <button
            onClick={() => handleBooking("a specialist")}
            className="inline-flex cursor-pointer items-center gap-2 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white px-8 py-4 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all text-lg"
          >
            <FiCalendar className="text-xl" />
            Book Your Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConsultationBooking;
