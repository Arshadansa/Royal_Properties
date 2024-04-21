import React from "react";
import Box from "@mui/material/Box";

import Buy from "../../components/buy/Buy";
import Rent from "../../components/rent/Rent";
import PG from "../../components/pg/PG";
import Search from "../../components/search/Search";
import { Grid } from "@mui/material";

const Home = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Search />
        </Grid>
        <Grid item xs={12}>
          <Buy />
        </Grid>
        <Grid item xs={12}>
          <Rent />
        </Grid>
        <Grid item xs={12}>
          <PG />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
