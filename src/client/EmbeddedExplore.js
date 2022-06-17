/**
 * Created by Looker Data Applications Team 2021
 * These are simplified code snippets representing functionality on the page,
 * to view full implementation click the "Open Sandbox" button below
 */

//import necssary dependencies
import React, { useCallback } from "react";
import { LookerEmbedSDK } from "@looker/embed-sdk";
import { EmbedContainer } from "./EmbedContainer";

const EmbeddedExplore = () => {
  //initialize state of explore
  const [explore, setExplore] = React.useState();

  const setupExplore = (explore) => {
    setExplore(explore);
  };

  /**
   * gets called onload
   * creates a stateful explore object that we pass to EmbedContainer to render the explore
   * steps are as follows:
   * 1) initialize the embed sdk
   * 2) create embedded explore by passing in an id
   * we're also making use of the withParams option to make the data, picker and vis section of explore visible by default
   * lastly, in the then callback, which gets called after creating the explore is successful,
   * we call setupExplore to save the explore to state so we can manipulate it later if we so desire
   */
  const embedCtrRef = useCallback((el) => {
    const hostUrl = "https://pbl.looker.com";
    if (el && hostUrl) {
      el.innerHTML = "";
      LookerEmbedSDK.init(hostUrl, "/api/auth");
      LookerEmbedSDK.createExploreWithId("atom_fashion::order_items")
        .withParams({
          toggle: "dat,pik,vis"
        })
        .appendTo(el)
        .build()
        .connect()
        .then(setupExplore)
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

export default EmbeddedExplore;
