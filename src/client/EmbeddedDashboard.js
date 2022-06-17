/**
 * Created by Looker Data Applications Team 2021
 * These are simplified code snippets representing functionality on the page,
 * to view full implementation click the "Open Sandbox" button below
 */

//import necssary dependencies
import React, { useCallback } from "react";
import { LookerEmbedSDK } from "@looker/embed-sdk";
import { EmbedContainer } from "./EmbedContainer";

const EmbeddedDashboard = ({ id }) => {
  //initialize state of dashboard
  const [dashboard, setDashboard] = React.useState();

  const setupDashboard = (dashboard) => {
    setDashboard(dashboard);
  };

  /**
   * gets called onload
   * creates a stateful dashboard object that we pass to EmbedContainer to render the dashboard
   * steps are as follows:
   * 1) initialize the embed sdk
   * 2) create embedded dashboard by passing in an id
   * we're also making use of the withTheme option to pass in a specific theme
   * lastly, in the then callback, which gets called after creating the dashboard is successful,
   * we call setupDashboard to save the dashboard to state so we can manipulate it later if we so desire
   */
  const embedCtrRef = useCallback((el) => {
    const hostUrl = "https://pbl.looker.com";
    if (el && hostUrl) {
      el.innerHTML = "";
      LookerEmbedSDK.init(hostUrl, "/api/auth");
      LookerEmbedSDK.createDashboardWithId(id || 1)
        .withNext()
        .withTheme("atom_fashion_filters") //for now
        .appendTo(el)
        .build()
        .connect()
        .then(setupDashboard)
        .catch((error) => {
          console.error("Connection error", error);
        });
    }
  }, []);

  return (
    <>
      <EmbedContainer ref={embedCtrRef} />
    </>
  );
};

export default EmbeddedDashboard;
