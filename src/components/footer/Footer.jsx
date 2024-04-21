import React from "react";
import { X, Instagram, YouTube } from "@mui/icons-material";

const Footer = () => {
  return (
    <div className="footer bg-slate-600 text-white p-4">
      <div className="prefooter flex flex-col md:flex-row">
        <div className="contact md:w-1/2 md:pr-16 md:text-justify md:pl-12">
          <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
          <div className="person1 mb-4">
            <p className="font-semibold">Mr. Rajeev Sharma</p>
            <p>
              R Tech Capital Galleria Bhiwadi, Capital Mall, Bhiwadi,
              Rajasthan 301019
            </p>
            <p>
              Phone - <a href="tel:+91-7665234506">+91-7665234506</a>
            </p>
          </div>
          <div className="person2">
            <p className="font-semibold">Mr. Akhilesh Mishra</p>
            <p>UIT Sector 5, Bhiwadi, Rajasthan 301019</p>
            <p>
              Phone - <a href="tel:+91-8860030049"> +91-8860030049 </a>
            </p>
          </div>
        </div>
       
        <div className="connect md:w-1/2 md:pl-16 pt-10 md:pt-0">

          <h1 className="text-xl font-bold mb-4">Connect with Us</h1>
          <div className="flex justify-center">
            <a
              href="https://www.twitter.com"
              target="_blank"
              className="mr-4"
            >
              <X fontSize="small" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              className="mr-4"
            >
              <Instagram fontSize="medium" />
            </a>
            <a href="https://www.youtube.com" target="_blank">
              <YouTube />
            </a>
          </div>
        </div>
      </div>
      <div className="copy mt-8">
        <p className="text-center text-sm">
          &copy; {new Date().getFullYear()} Royal Properties. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
