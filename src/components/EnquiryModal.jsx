import { useState } from "react";
import axios from "axios";
import {
  Modal,
  Typography,
  Box,
  Input,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const EnquiryModal = ({ open, handleClose }) => {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    enquiry: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phoneNumber, email, enquiry } = formData;
    // Send form data to backend or perform desired action here
    // For demonstration, simply setting "sent" state to true
    try {
      if (
        name.length === 0 ||
        email.length === 0 ||
        phoneNumber.length === 0 ||
        enquiry.length === 0
      ) {
        alert("Please fill all the fields");
        window.location.href = "/";
      } else {
        axios
          .post(
            "https://portfolioserver-beryl.vercel.app/sendEnquiry@JMD",
            {
              name,
              email,
              phoneNumber,
              enquiry,
            }
          )
          .then((res) => {
            if (res.status === 200) {
                setSent(true);
            //   window.location.href = "/";
            //   alert(res.data);
            } else if (res.status === 400) {
              console.log(res.data);
            }
          });
      }
    } catch (error) {
      alert("Error Occured");
    }
    
  };

  const style = {
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    m: "auto",
    mt: 12,
    rounded: "xl",
    borderRadius: "10px",
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          sx={{ marginLeft: "90%" }}
        >
          <CloseIcon />
        </IconButton>
        {sent ? (
          <>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Sent successfully
            </Typography>
          </>
        ) : (
          <>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Enquiry Form
            </Typography>
            <form onSubmit={handleSubmit}>
              <div className="mt-4">
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="border border-gray-300 px-3 py-2 rounded-md w-full"
                />
              </div>
              <div className="mt-4">
                <Input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="border border-gray-300 px-3 py-2 rounded-md w-full"
                />
              </div>
              <div className="mt-4">
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="border border-gray-300 px-3 py-2 rounded-md w-full"
                />
              </div>
              <div className="mt-4">
                <Input
                  multiline
                  rows={4}
                  name="enquiry"
                  value={formData.enquiry}
                  onChange={handleChange}
                  placeholder="Enquiry"
                  className="border border-gray-300 px-5 py-4 rounded-md w-full"
                />
              </div>
              <div className="mt-4">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="w-full"
                >
                  Send
                </Button>
              </div>
            </form>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default EnquiryModal;
