/**
 * Created by Looker Data Applications Team 2021
 * These are simplified code snippets representing functionality on the page,
 * to view full implementation click the "Open Sandbox" button below
 */

/**
 * Note on Visualization Components
 * This is an all new initiative led by Looker's Components team
 * designed to make it easy for developers to create visualizations
 * based on Looker data without requiring a third party dependency.
 * As a developer, this is preferable because the visualization library
 * is compatible with the API out of the box, speeding up time to value.
 * Questions? Reach out to Elliot Glasenk | eglasenk@google.com
 */

//import necssary dependencies
import React from "react";
import { getSdk } from "../utils/client/looker_sdk";
import { Box, Heading } from "@looker/components";
import { DataProvider } from "@looker/components-data";
import { Query, Visualization } from "@looker/visualizations";
import { ComponentsProvider } from "@looker/components";
import { i18nInit as i18nInitVis, i18nResources } from "@looker/visualizations";

i18nInitVis();

console.log({ Query, Visualization });
const VisualizationComponent = () => {
  console.log("VisualizationComponent");
  //initialize sdk in order to start making calls
  const sdk = getSdk();
  //static query id, also works with qid
  const id = "2047";
  console.log({ sdk, id });

  /**
   * config object accepts a variety of parameters, for further discussion consult this link:
   * https://docs.looker.com/data-modeling/extension-framework/vis-components-prop-tables
   */
  return (
    <DataProvider sdk={sdk}>
      <ComponentsProvider loadGoogleFonts resources={i18nResources}>
        <Box>
          <Heading>Visualization Component</Heading>
          <Query
            query={id}
            config={{
              legend: {
                position: "bottom"
              },
              limit_displayed_rows: false,
              ordering: "none",
              positioning: "grouped",
              series: {
                "orders.count": {
                  value_format: "0,0.[00]",
                  label: "",
                  color: "#6c43e0",
                  visible: true
                }
              },
              show_null_labels: false,
              show_silhouette: false,
              show_totals_labels: false,
              tooltips: true,
              totals_color: "#808080",
              type: "column",
              x_axis: [
                {
                  gridlines: false,
                  label: "Orders Created Date",
                  reversed: false,
                  values: true
                }
              ],
              y_axis: [
                {
                  gridlines: true,
                  label: "Orders Count",
                  range: ["auto", "auto"],
                  values: true
                }
              ]
            }}
          >
            <Visualization />
          </Query>
        </Box>
      </ComponentsProvider>
    </DataProvider>
  );
};
export default VisualizationComponent;
