import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { API } from "../../Axios/Axios.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import EnquiryModal from "../EnquiryModal";

import "./Buy.css";
import { Skeleton } from "@mui/material";

const Buy = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    navigator: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          arrows:true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: false, 
        },
      },
    ],
  };
  const [sliderWidth, setSliderWidth] = useState("50vw"); 
  const [padding,setPadding]=useState("30px");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get("/api/v1/getPropsonSell");
        setProjects(res.data.props);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProjects();
  }, []);
  useEffect(() => {
    // Function to calculate the appropriate width based on viewport width
    const calculateWidth = () => {
      const viewportWidth = window.innerWidth;
      if (viewportWidth >= 1024) {
        setSliderWidth("95vw"); // Adjusted width for desktop view
      } else if (viewportWidth >= 768 && viewportWidth < 1024) {
        setSliderWidth("80vw"); // Adjusted width for tablet view
      } else {
        setSliderWidth("90vw"); // Default width for mobile view
        setPadding("30px 0px");
      }
    };

    // Calculate width initially and add event listener for window resize
    calculateWidth();
    window.addEventListener("resize", calculateWidth);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", calculateWidth);
    };
  }, []);

  return (
    <div className="text-left pl-6 pt-14">
      <h1 className="text-black-500 text-2xl font-bold">
        Handpicked Properties on Sell
      </h1>
      <h4 className="text-slate-400">Featured Projects</h4>
      {projects.length === 0 ? (
        <>
          <Skeleton variant="rectangular" height={218} />
        </>
      ) : (
        <>
          <Slider
            {...settings}
            style={{ width: sliderWidth, padding: padding,}}
            id="buyslider"
          >
            {projects.map((project) => (
              <div key={project.id} className="relative">
                <img
                  src={project.imgUrl}
                  alt={project.id}
                  id="project_img_buy"
                />
                <div
                  id="project_desc"
                  className="ml-12 md:ml-16  mb-4 px-4 md:pl-8 pt-4 pb-4 bg-white shadow-lg rounded-lg w-full md:w-80 sm:w-full h-auto md:h-22 relative overflow-hidden"
                >
                  <h3 className="font-bold">
                    {project.name}, {project.address}{" "}
                  </h3>
                  <p className="text-slate-400">{project.description}</p>
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-slate-600 bg-opacity-50 p-4 rounded overlay">
                    <button className="text-white bg-blue-500 px-3 py-1 mr-2 rounded">
                      <a href="tel:+91-8860030049">Call</a>
                    </button>
                    <button
                      className="text-white bg-green-500 px-3 py-1 rounded"
                      onClick={handleOpen}
                    >
                      Send Enquiry
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </>
      )}

      <EnquiryModal open={open} handleClose={handleClose} />
    </div>
  );
};

export default Buy;
