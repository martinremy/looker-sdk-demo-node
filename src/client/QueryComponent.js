/**
 * Created by Looker Data Applications Team 2021
 * These are simplified code snippets representing functionality on the page,
 * to view full implementation click the "Open Sandbox" button below
 */

import React, { useState, useEffect } from "react";
import { getSdk } from "../utils/client/looker_sdk";
// import { Query } from "@looker/visualizations-visx";
import { Query, Visualization, Scatter } from "@looker/visualizations";
import { Box, Heading } from "@looker/components";
console.log({ Query });
const QueryComponent = () => {
  console.log("QueryComponent");
  const sdk = getSdk();
  console.log({ sdk });
  return (
    <Box>
      <Heading>Query Visualization Component</Heading>
      <Query
        sdk={sdk}
        query="s3UExbBGzdcGXS9EFoNIF3" //scatter
      >
        <Visualization />
        {/* <Scatter /> */}
      </Query>
    </Box>
  );
};
export default QueryComponent;
