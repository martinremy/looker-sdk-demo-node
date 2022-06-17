// /**
//  * Created by Looker Data Applications Team 2021
//  * These are simplified code snippets representing functionality on the page,
//  * to view full implementation click the "Open Sandbox" button below
//  */

// import React, { useState, useEffect, useCallback } from "react";
// import { getSdk } from "../utils/client/looker_sdk";
// import {
//   ComponentsProvider,
//   DashboardFilter,
//   i18nResources,
//   Filter
// } from "@looker/filter-components";
// import { Heading, Space, theme } from "@looker/components";
// import { LookerEmbedSDK } from "@looker/embed-sdk";
// import { EmbedContainer } from "./EmbedContainer";
// import styled from "styled-components";

// const myTheme = {
//   ...theme,
//   customColor: "green",
//   customBorderRadius: "20px"
// };

// const DynamicFilters = () => {
//   const sdk = getSdk();
//   const [filters, setFilters] = useState();
//   const [filterValues, setFilterValues] = useState();
//   const [dashboard, setDashboard] = useState();

//   useEffect(() => {
//     getTest();
//   }, []);

//   const getTest = async () => {
//     try {
//       const results = await sdk.ok(sdk.dashboard("9"));
//       setFilters(results.dashboard_filters);
//       let filterValuesObj = {};
//       results.dashboard_filters.map((filter) => {
//         filterValuesObj[filter.name] = filter.default_value;
//       });
//       setFilterValues(filterValuesObj);
//     } catch (e) {
//       console.log({ e });
//     }
//   };

//   const updateFilters = ({ name, expression }) => {
//     if (name && filterValues.hasOwnProperty(name)) {
//       dashboard.updateFilters({ [name]: expression });
//       dashboard.run();
//     }
//   };

//   const setupDashboard = (dashboard) => {
//     setDashboard(dashboard);
//   };

//   const embedCtrRef = useCallback((el) => {
//     const hostUrl = "https://pbl.looker.com";
//     if (el && hostUrl) {
//       el.innerHTML = "";
//       LookerEmbedSDK.init(hostUrl, "/api/auth");
//       LookerEmbedSDK.createDashboardWithId(9)
//         .withNext()
//         .withTheme("atom_fashion") //for now
//         .appendTo(el)
//         .build()
//         .connect()
//         .then(setupDashboard)
//         .catch((error) => {
//           console.error("Connection error", error);
//         });
//     }
//   }, []);

//   return filters ? (
//     <>
//       <FiltersSection
//         filters={filters}
//         filterValues={filterValues}
//         updateFilters={updateFilters}
//       />
//       <EmbedContainer ref={embedCtrRef} />
//     </>
//   ) : (
//     <StyledHeading as="h6">Loading</StyledHeading>
//   );
// };

// export const FiltersSection = ({ filters, filterValues, updateFilters }) => {
//   return (
//     <ComponentsProvider resources={i18nResources} theme={myTheme}>
//       {filters.map((filter) => (
//         <Space align="start">
//           <StyledHeading as="h6">{filter.title}</StyledHeading>
//           <StyledFilter
//             key={filter.id}
//             field={filter.field}
//             type={filter.type}
//             name={filter.title}
//             expression={
//               filterValues && filterValues[filter.name]
//                 ? filterValues[filter.name]
//                 : ""
//             }
//             onChange={(value) =>
//               updateFilters({ name: filter.name, expression: value.expression })
//             }
//           />
//         </Space>
//       ))}
//     </ComponentsProvider>
//   );
// };
// //not working
// const StyledFilter = styled(Filter)`
//   border-radius: ${(props) => props.theme.customBorderRadius};
//   color: ${(props) => props.theme.customColor};
// `;
// //working
// const StyledHeading = styled(Heading)`
//   color: ${(props) => props.theme.customColor};
// `;

// export default DynamicFilters;
