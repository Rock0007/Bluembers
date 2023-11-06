import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { Footer } from "../Components";
import { Amogh, Ayman, Kapil, Rahul, Rohan } from "../assets/index";

const mentor = {
  name: "Prof. Amogh Deshmukh",
  role: "Mentor",
  profilePicture: Amogh,
};

const students = [
  {
    name: "AS Kapil",
    role: "Fullstack Developer",
    profilePicture: Kapil,
    githubUrl: "https://github.com/Rock0007",
  },
  {
    name: "Rahul Samineni",
    role: "Frontend Developer, Team Leader",
    profilePicture: Rahul,
  },
  {
    name: "Ayman Shaikh",
    role: "Student",
    profilePicture: Ayman,
  },
  {
    name: "Rohan Ravula",
    role: "Student",
    profilePicture: Rohan,
  },
  {
    name: "Sikesh Gaddam",
    role: "Intern",
    profilePicture: "",
  },
];

const About = () => {
  return (
    <div className="w-full min-h-screen bg-lightOverlay overflow-x-hidden">
      <Header />
      <div className="container mx-auto mt-28 text-left px-20">
        <h1
          className="text-3xl font-semibold mb-4"
          style={{ color: "rgb(241, 26, 123)" }}
        >
          Who We Are?
        </h1>

        <p className="text-lg text-gray-700 mb-8">
          <span className="font-bold">BluEmbers</span> is the product of a
          passionate group of B.Tech-2026 students from Woxsen University,
          ushering in a new era of culinary convenience on campus. With a shared
          vision to simplify the dining experience. We created a seamless
          Restaurant Web Application that eliminates the hassle of traditional
          food ordering. Our platform empowers students and visitors to place
          orders from anywhere, eliminating the need to wait in long queues.
          Once their meal is prepared, a simple notification allows them to
          collect their orders at their convenience. This innovative approach,
          crafted without external assistance, has transformed the way people
          enjoy their meals, making BluEmbers the epitome of hassle-free and
          efficient food ordering at Woxsen University.
        </p>

        <h1
          className="text-3xl font-semibold mb-4"
          style={{ color: "rgb(152, 33, 118)" }}
        >
          Our Services
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          With our services, you can place food orders from anywhere on campus.
          Once your order is ready, you can simply pick it up from BluEmbers
          restaurant without waiting in long queues.
        </p>

        <h2
          className="text-3xl font-semibold mb-4"
          style={{ color: "rgb(119, 82, 254)" }}
        >
          Key Features
        </h2>
        <ul className="text-lg text-gray-700 mb-8 pl-5">
          <li className="list-disc pl-4 mb-2">
            Easy online food ordering from any location on campus.
          </li>
          <li className="list-disc pl-4 mb-2">
            Quick and efficient order processing.
          </li>
          <li className="list-disc pl-4 mb-2">
            No more waiting in queues; just pick up your food when it's ready.
          </li>
          <li className="list-disc pl-4 mb-2">
            Secure user authentication and data privacy.
          </li>
          <li className="list-disc pl-4 mb-2">
            Seamless integration with BluEmbers restaurant services.
          </li>
        </ul>

        <h2
          className="text-3xl font-semibold mb-4"
          style={{ color: "rgb(222, 143, 95)" }}
        >
          How It Works
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          1.{" "}
          <Link to="/login" className="underline decoration-solid">
            Login
          </Link>{" "}
          using your credentials.
          <br />
          2. Browse the{" "}
          <Link to="/menu" className="underline decoration-solid">
            Menu
          </Link>
          , select your items add to cart, and place your order online.
          <br />
          3. Wait for a status indicating that your{" "}
          <Link to="/user-orders" className="underline decoration-solid">
            Order
          </Link>{" "}
          is ready for pickup.
          <br />
          4. Head to BluEmbers restaurant, show your order confirmation, and
          enjoy your meal!
        </p>
      </div>

      <div className="bg-gray-100">
        <h2
          className="text-3xl font-semibold text-center px-20 py-10"
          style={{ color: "rgb(6, 143, 255)" }}
        >
          Tech Team
        </h2>

        <div className="flex flex-wrap justify-center ">
          {/* Mentor Card */}
          <div
            className="m-4 p-6 max-w-xs bg-white rounded-lg shadow-md flex items-center flex-col hover:bg-blue-50 cursor-pointer"
            style={{ flexBasis: "30%" }}
          >
            <img
              src={mentor.profilePicture}
              className="w-16 h-16 mb-2 rounded-full bg-gray-300"
              alt={`${mentor.name}'s Profile`}
            />
            <h2 className="text-xl font-semibold">{mentor.name}</h2>
            <p className="text-gray-600 mb-2">{mentor.role}</p>
          </div>

          {/* Rest of the Students */}
          {[...students].map((person, index) => (
            <div
              key={index}
              className="m-4 p-6 max-w-xs bg-white rounded-lg shadow-md flex items-center flex-col cursor-pointer hover:bg-purple-50"
              style={{ flexBasis: "30%" }}
            >
              <img
                src={person.profilePicture}
                className="w-16 h-16 mb-2 rounded-full bg-gray-300"
                alt={`${person.name}'s Profile`}
              />
              <h2 className="text-xl font-semibold">{person.name}</h2>
              <p className="text-gray-600 mb-2">{person.role}</p>
              {/* GitHub Icon and URL (only for AS Kapil) */}
              {person.name === "AS Kapil" && person.githubUrl && (
                <a
                  href={person.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline flex items-center"
                >
                  <FaGithub className="text-black" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center md:px-24 xl:px-10 w-full mt-8">
        <Footer />
      </div>
    </div>
  );
};

export default About;
