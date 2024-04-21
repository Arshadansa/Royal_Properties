import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { alpha } from "@mui/material/styles";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import InputBase from "@mui/material/InputBase";
// import MenuItem from "@mui/material/MenuItem";
// import Menu from "@mui/material/Menu";
// import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
// import MoreIcon from "@mui/icons-material/MoreVert";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

// import logo from "../../assets/logo/logo-no-background.png";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/auth";

// const StyledAppbar = styled(AppBar)({
//   backgroundColor: "#005CA8",
//   color: "white",
//   boxShadow: "none",
//   height: "65px",
//   "& img": {
//     cursor: "pointer",
//   },
// });

// export default function PrimarySearchAppBar() {
//   const navigate = useNavigate();
//   const loginResponse = useSelector((state) => state.authReducer.data);
//   const handleNavigation = () => {
//     navigate("/auth/login");
//   };

//   const dispatch = useDispatch();
//   const handleLogout = () => {
//     dispatch(logout(navigate));
//   };
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

//   const isMenuOpen = Boolean(anchorEl);
//   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

//   const handleProfileMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMobileMenuOpen = (event) => {
//     setMobileMoreAnchorEl(event.currentTarget);
//   };
//   const handleMobileMenuClose = () => {
//     setMobileMoreAnchorEl(null);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     handleMobileMenuClose();
//   };

//   const menuId = "primary-search-account-menu";
//   const renderMenu = (
//     <Menu
//       anchorEl={anchorEl}
//       anchorOrigin={{
//         vertical: "bottom",
//         horizontal: "right",
//       }}
//       id={menuId}
//       keepMounted
//       transformOrigin={{
//         vertical: "top",
//         horizontal: "right",
//       }}
//       open={isMenuOpen}
//       onClose={handleMenuClose}
//       PaperProps={{
//         onMouseLeave: () => {
//           setTimeout(() => {
//             handleMenuClose();
//           }, 300);
//         },
//       }}
//     >
//       <MenuItem
//         onClick={() => {
//           handleMenuClose();
//           navigate("/account/details");
//         }}
//       >
//         <ManageAccountsIcon />
//         &nbsp; <span className="font-bold"> My Account </span>
//       </MenuItem>
//       <MenuItem
//         onClick={() => {
//           handleMenuClose();
//           handleLogout();
//         }}
//       >
//         <LogoutIcon className="font-bold text-red-700" /> &nbsp;{" "}
//         <span className="font-bold text-red-700">Log Out </span>
//       </MenuItem>
//     </Menu>
//   );

//   const mobileMenuId = "primary-search-account-menu-mobile";
//   const renderMobileMenu = (
//     <Menu
//       anchorEl={mobileMoreAnchorEl}
//       anchorOrigin={{
//         vertical: "top",
//         horizontal: "right",
//       }}
//       id={mobileMenuId}
//       keepMounted
//       transformOrigin={{
//         vertical: "top",
//         horizontal: "right",
//       }}
//       open={isMobileMenuOpen}
//       onClose={handleMobileMenuClose}
//     >
//       <MenuItem></MenuItem>
//       <MenuItem onClick={handleProfileMenuOpen}>
//         <IconButton
//           size="large"
//           aria-label="account of current user"
//           aria-controls="primary-search-account-menu"
//           aria-haspopup="true"
//           color="inherit"
//         >
//           <AccountCircle />
//         </IconButton>
//         <p>Profile</p>
//       </MenuItem>
//     </Menu>
//   );

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <StyledAppbar position="fixed">
//         <Toolbar>
//           <Typography
//             variant="h6"
//             noWrap
//             component="div"
//             sx={{ display: { xs: "none", sm: "block" } }}
//           >
//             <NavLink to="/">
//               <img
//                 src={logo}
//                 alt="logo"
//                 id="logo"
//                 height="50px"
//                 width="150px"
//               />
//             </NavLink>
//           </Typography>
//           {/* <Search id="searchbar">
//             <SearchIconWrapper>
//               <SearchIcon />
//             </SearchIconWrapper>
//             <StyledInputBase
//               placeholder="Search by city, locality..."
//               inputProps={{ "aria-label": "search" }}
//               sx={{ width: "100%" }}
//             />
//           </Search> */}
//           <Box sx={{ flexGrow: 1 }} />

//           <Box sx={{ display: { xs: "flex", md: "none" } }}>
//             <IconButton
//               size="large"
//               aria-label="show more"
//               aria-controls={mobileMenuId}
//               aria-haspopup="true"
//               onClick={handleMobileMenuOpen}
//               color="inherit"
//             >
//               <MoreIcon />
//             </IconButton>
//           </Box>
//           {loginResponse == null ? (
//             <>
//               <Box sx={{ display: { xs: "none", md: "flex" } }}>
//                 <LoginBtn
//                   style={{ textTransform: "none" }}
//                   onClick={handleNavigation}
//                 >
//                   <LoginIcon /> &nbsp; Login
//                 </LoginBtn>
//               </Box>
//             </>
//           ) : (
//             <>
//               <Box sx={{ display: { xs: "none", md: "flex" } }}>
//                 <IconButton
//                   size="large"
//                   edge="end"
//                   aria-label="account of current user"
//                   aria-controls={menuId}
//                   aria-haspopup="true"
//                   onMouseEnter={handleProfileMenuOpen}
//                   color="inherit"
//                 >
//                   <AccountCircle />
//                 </IconButton>
//               </Box>
//             </>
//           )}
//         </Toolbar>
//       </StyledAppbar>
//       {renderMobileMenu}
//       {renderMenu}
//     </Box>
//   );
// }

import * as React from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "../../assets/logo/Royal_Properties.png";

const pages = [];

const LoginBtn = styled(Button)`
  background-color: #faf8f7;
  color: #1f6dcc;
  &:hover {
    background-color: #faf8f7;
    color: #1f6dcc;
  }
`;

const StyledAppbar = styled(AppBar)({
  margin: 0,
  backgroundColor: "#005CA8",
  color: "white",
  boxShadow: "none",
  height: "65px",
  "& img": {
    cursor: "pointer",
  },
});

function PrimarySearchAppBar() {
  const navigate = useNavigate();
  const loginResponse = useSelector((state) => state.authReducer.data);
  const handleNavigation = () => {
    navigate("/auth/login");
  };

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const settings = [
    <div
      onClick={() => {
        handleCloseUserMenu();
        navigate("/account/details");
      }}
    >
      {" "}
      <ManageAccountsIcon />
      &nbsp; <span className="font-bold"> My Account </span>
    </div>,
    <div
      onClick={() => {
        handleCloseUserMenu();
        handleLogout();
      }}
    >
      {" "}
      <LogoutIcon className="font-bold text-red-700" /> &nbsp;{" "}
      <span className="font-bold text-red-700">Log Out </span>
    </div>,
  ];

  return (
    <StyledAppbar position="fixed">
  <Container maxWidth="xl">
    <Toolbar disableGutters>
      {/* Logo for desktop view */}
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="#app-bar-with-responsive-menu"
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        <NavLink to="/">
          {" "}
          <img
            src={logo}
            alt="logo"
            id="logo"
            height="50px"
            width="250px"
          />
        </NavLink>
      </Typography>

      {/* Logo for mobile view */}
      <Typography
        variant="h5"
        noWrap
        component="a"
        href="#app-bar-with-responsive-menu"
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        <NavLink to="/">
          <img
            src={logo}
            alt="logo"
            id="logo"
            height="50px"
            width="150px"
          />
        </NavLink>
      </Typography>

     

      {/* Menu items for desktop view */}
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {pages.map((page) => (
          <Button
            key={page}
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            {page}
          </Button>
        ))}
      </Box>

      {/* Login or account icon */}
      {loginResponse == null ? (
        <Box>
          <LoginBtn
            style={{ textTransform: "none" }}
            onClick={handleNavigation}
          >
            <LoginIcon /> &nbsp; Login
          </LoginBtn>
        </Box>
      ) : (
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title={loginResponse?.user?.username}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={loginResponse?.user?.username[0]} src="/static/images/avatar/2.jpg" style={{border:"3px solid white", backgroundColor:"#718096"}}/>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onMouseEnter={handleOpenUserMenu}
            onClose={handleCloseUserMenu}
            PaperProps={{
              onMouseLeave: () => {
                setTimeout(() => {
                  handleCloseUserMenu();
                }, 300);
              },
            }}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      )}
    </Toolbar>
  </Container>
</StyledAppbar>

  );
}
export default PrimarySearchAppBar;
