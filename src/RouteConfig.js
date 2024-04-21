import React from "react";
import { Route, Routes, useParams } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Auth from "./pages/auth/Auth.jsx";
import Account from "./pages/account/Account.jsx";
import Layout from "./components/outlet/Layout.jsx";
import PrimarySearchAppBar from "./components/navbar/PrimarySearchAppBar.jsx";
import UploadData from "./pages/admin/UploadData.jsx";

const RouteConfig = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" exact element={<Home />} />
          <Route path="/auth/:action" element={<Auth />} />
          <Route path="/account/details" element={<Account />} />
          <Route path="/admin/upload/" element={<UploadData />} />
        </Route>
      </Routes>
    </div>
  );
};

export default RouteConfig;
