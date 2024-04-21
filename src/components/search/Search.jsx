import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Search.css";
import axios from "axios";
import { Grid, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import styled from "@emotion/styled";
import MenuItem from "@mui/material/MenuItem";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ListSubheader from "@mui/material/ListSubheader";
import Select from "@mui/material/Select";

import "../../pages/home/Home.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocation,
  faMicrophone,
  faStop,
} from "@fortawesome/free-solid-svg-icons";
import EnquiryModal from "../EnquiryModal";

const StyledCard = styled(Card)`
  width: 60vw;
  height: 33vh;
  background-color: #f0f0f0;
  color: #000;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  margin: 10px;
  padding: 10px;
`;

const CatButton = styled.button`
  background: none;
  border: none;
  color: ${({ selected }) => (selected ? "#333" : "#999")};
  font-size: 16px;
  font-weight: ${({ selected }) => (selected ? "bold" : "normal")};
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    color: #333;
  }
`;
const CatButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const CatButtonLine = styled.div`
  height: 5px;
  width: 100%;
  background-color: #007bff;
  margin-top: -5px;
  display: ${({ selected }) => (selected ? "block" : "none")};
`;

const StyledSelect = styled(Select)`
  border: none;
  padding: 3px 0px;
  width: 120px;
  height: 46px;
`;

const StyledButton = styled(Button)`
  background-color: #3a95f0;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;
  font-size: 16px;
  font-weight: 600;
  &:hover {
    background-color: #0669cc;
  }
`;

const categoryMap = {
  buy: { category: "residential", subcategory: "buy" },
  rent: { category: "residential", subcategory: "rent" },
  pg: { category: "residential", subcategory: "pg" },
  buy2: { category: "commercial", subcategory: "buy" },
  lease: { category: "commercial", subcategory: "lease" },
};

const Search = () => {
  const [openBd, setOpenBd] = React.useState(false);
  const handleCloseBd = () => {
    setOpenBd(false);
  };
  const handleOpenBd = () => {
    setOpenBd(true);
  };
  const contentList = [
    "Buy",
    "Rent",
    "PG / Co-Living",
    "Commercial",
    "Plots / Land",
  ];
  const [selectedCategory, setSelectedCategory] = useState(contentList[0]);
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  const [category, setCategory] = useState("residential");
  const [subcategory, setSubcategory] = useState("buy");

  const handleSelectionChange = (event) => {
    const value = event.target.value;
    if (categoryMap[value]) {
      setCategory(categoryMap[value].category);
      setSubcategory(categoryMap[value].subcategory);
    }
  };

  var [listen, setListen] = useState(false);
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true });
  var { transcript, browserSupportsSpeechRecognition, resetTranscript } =
    useSpeechRecognition();

  transcript && console.log(transcript);

  const [location, setLocation] = useState(null);
  // search by typing city
  const [cities, setCities] = useState([]);
  var [city, setCity] = useState("");
  const [openList1, setOpenList1] = useState(false);
  const handleCityClick = (selectedCity) => {
    setCity(selectedCity);
    setOpenList1(false);
  };

  document.addEventListener("click", (e) => {
    if (e.target.id !== "searchinput") {
      setOpenList1(false);
    }
  });

  // location detection

  function handleLocationClick() {
    console.log("location detection clicked ---- ");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
      // setCity(weather?.name);
    } else {
      console.log("Geolocation not supported");
    }
  }

  async function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({ latitude, longitude });

    // Make API call to OpenWeatherMap
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=5c61d15ecbe202cf7d97d4dfe626fc88&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        setCity(data.name);
        // setWeather(data);
      })
      .catch((error) => console.log(error));
  }
  function error() {
    console.log("Unable to retrieve your location");
  }

  //voice Search
  const [searchResult, setSearchResult] = useState([]);
  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await axios.get(
      `https://jmd-real-estate-server.vercel.app/api/v1/search?category=${category}&subcategory=${subcategory}&address=${city}`
    );
    setSearchResult(res.data.result);
    if (res.data.result.length === 0) {
      toast.info("No Property found for this search");
      setOpenBd(false);
    } else {
      toast.success(`${res.data.result.length}` + " Property found");
      setOpenBd(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(
          "https://med-hos-server.vercel.app/fetchCity"
        );
        setCities(res?.data.documents[0].geonames.map((city) => city.name));
      } catch (error) {
        console.log(error);
      }
    };

    const timeoutId = setTimeout(fetchData, 1000);

    return () => clearTimeout(timeoutId);
  }, []);
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [sliderWidth, setSliderWidth] = useState("50vw");
  const [padding, setPadding] = useState("30px");
  useEffect(() => {
    // Function to calculate the appropriate width based on viewport width
    const calculateWidth = () => {
      const viewportWidth = window.innerWidth;
      if (viewportWidth >= 1024) {
        setSliderWidth("95vw"); // Adjusted width for desktop view
      } else if (viewportWidth >= 768 && viewportWidth < 1024) {
        setSliderWidth("80vw"); // Adjusted width for tablet view
      } else {
        setSliderWidth("85vw"); // Default width for mobile view
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
    <div>
      <Grid container spacing={2} className="pt-12">
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc5dB0TdflQmURxEbK8lYzPg_98JXN5A2u1Q&usqp=CAU"
              alt="home_poster"
              width="100%"
              height="50px"
              style={{
                borderTopRightRadius: "10px",
                borderBottomRightRadius: "10px",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
              }}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={8}>
          <Box sx={{ minWidth: 275 }} id="homebox">
            <StyledCard variant="outlined" id="searchcard">
              <div>
                {/* {contentList.map((content, index) => {
                  return (
                    <button key={content} id="catbtn">
                      {content}
                    </button>
                  );
                })} */}
                <CatButtonContainer id="cats">
                  {contentList.map((content, index) => (
                    <CatButton
                      key={content}
                      selected={selectedCategory === content}
                      onClick={() => handleCategoryClick(content)}
                    >
                      {content}
                    </CatButton>
                  ))}
                </CatButtonContainer>
                {/* <CatButtonLine selected={true} /> */}
              </div>

              <div id="search">
                <span id="select">
                  <StyledSelect
                    defaultValue="buy"
                    id="grouped"
                    onChange={handleSelectionChange}
                  >
                    <ListSubheader>Residential</ListSubheader>
                    <MenuItem value="buy" selected={subcategory === "buy"}>
                      Buy
                    </MenuItem>
                    <MenuItem value="rent" selected={subcategory === "rent"}>
                      Rent
                    </MenuItem>
                    <MenuItem value="pg" selected={subcategory === "pg"}>
                      PG
                    </MenuItem>
                    <ListSubheader>Commercial</ListSubheader>
                    <MenuItem value="buy2" selected={subcategory === "buy"}>
                      Buy
                    </MenuItem>
                    <MenuItem value="lease" selected={subcategory === "lease"}>
                      Lease
                    </MenuItem>
                  </StyledSelect>
                </span>
                <span id="searchbarhome">
                  <form
                    method="post"
                    onSubmit={handleSearch}
                    style={{ display: "inline" }}
                  >
                    <input
                      type="text"
                      id="searchinput"
                      name="city"
                      value={city || transcript}
                      autoComplete="off"
                      onClick={(e) => {
                        setCity("");
                      }}
                      onChange={(e) => {
                        setCity(e.target.value);
                        setOpenList1(true);
                        if (e.target.value.length === 0) {
                          setOpenList1(false);
                          resetTranscript();
                        }
                      }}
                      placeholder="Search by City"
                      style={{ cursor: "., auto" }}
                    />
                    <div id="widget">
                      <Tooltip title="Search by Location" placement="bottom">
                        <FontAwesomeIcon
                          icon={faLocation}
                          onClick={handleLocationClick}
                          className="actionBtn"
                        />
                      </Tooltip>
                      <div className="voiceBtn">
                        {listen ? (
                          <>
                            <button
                              onClick={() => {
                                SpeechRecognition.stopListening();
                                setListen(false);
                              }}
                            >
                              {" "}
                              <Tooltip title="Stop" placement="bottom">
                                <FontAwesomeIcon
                                  icon={faStop}
                                  className="ml-1 p-2 md:p-2 lg:p-2 rounded-full bg-blue-100 text-blue-500 cursor-pointer"
                                ></FontAwesomeIcon>
                              </Tooltip>
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                console.log("listening");
                                startListening();
                                setListen(true);
                              }}
                            >
                              <Tooltip
                                title="Search by Voice"
                                placement="bottom"
                              >
                                <FontAwesomeIcon
                                  icon={faMicrophone}
                                  className="ml-1 p-2 md:p-2 lg:p-2 rounded-full bg-blue-100 text-blue-500 cursor-pointer"
                                ></FontAwesomeIcon>
                              </Tooltip>
                            </button>
                          </>
                        )}
                      </div>
                      <StyledButton type="submit" onClick={handleOpenBd}>
                        Search
                      </StyledButton>
                    </div>
                  </form>
                </span>
              </div>
            </StyledCard>
          </Box>
        </Grid>
      </Grid>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBd}
        onClick={handleCloseBd}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div
        className="dancing-script-div text-left inline-block text-3xl md:text-4xl md:w-3/5 mt-12 mb-8"
        style={{
          fontWeight: "600",
          backgroundImage: "linear-gradient(to right, red, blue)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Chune ... Apne Sapno Ka Ghar ...
      </div>
      {(openList1 || transcript) && (
        <div className="searchResult">
          {cities
            ?.filter((mycity) =>
              mycity
                .toLowerCase()
                .includes(city.toLocaleLowerCase() || transcript.toLowerCase())
            )
            .map(
              (city, index) =>
                index < 5 && (
                  <div
                    className="cursor-pointer hover:bg-gray-100 pl-2 pt-2 pb-2 citylist"
                    onClick={() => {
                      handleCityClick(city);
                      SpeechRecognition.stopListening();
                      setListen(false);
                      resetTranscript();
                    }}
                    key={index}
                  >
                    {city}
                  </div>
                )
            )}
          {cities?.filter((mycity) =>
            mycity
              .toLowerCase()
              .includes(city.toLocaleLowerCase() || transcript.toLowerCase())
          ).length === 0 ? (
            <>
              <div className="citylist p-4">No Results Found</div>
            </>
          ) : (
            <></>
          )}
        </div>
      )}
      {searchResult.length !== 0 && (
        <div className="pl-6 mb-12">
          <h4 className="text-start pl-8 text-xl font-semibold">
            {`Showing ${searchResult.length} Property results for ${searchResult[0]?.address} to ${searchResult[0]?.subcategory}`}
          </h4>
          <Slider
            {...settings}
            style={{ width: sliderWidth, padding: padding }}
            id="buyslider"
          >
            {searchResult.map((property, index) => (
              <div key={index} className="relative">
                <img
                  src={property.imgUrl}
                  alt="property"
                  id="project_img_buy"
                />
                <div
                  id="project_desc"
                  className="ml-4 md:ml-16  mb-4 px-4 md:pl-8 pt-4 pb-4 bg-white shadow-lg rounded-lg w-full md:w-80 sm:w-full h-auto md:h-22 relative overflow-hidden "
                >
                  <h3 className="font-bold">
                    {property.name}, {property.address}
                  </h3>
                  <p className="text-slate-400">{property.description}</p>
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
          <hr className="mt-12 -ml-5" />
        </div>
      )}

      <EnquiryModal open={open} handleClose={handleClose} />
      <ToastContainer />
    </div>
  );
};

export default Search;
