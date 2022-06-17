/**
 * Created by Looker Data Applications Team 2021
 * These are simplified code snippets representing functionality on the page,
 * to view full implementation click the "Open Sandbox" button below
 */

//import necssary dependencies
import React, { useCallback, useEffect } from "react";
import { LookerEmbedSDK } from "@looker/embed-sdk";
import { EmbedContainer } from "./EmbedContainer";

const EmbeddedQuery = () => {
  //initialize state of query
  const [query, setQuery] = React.useState();

  const setupQuery = (query) => {
    setQuery(query);
  };

  /**
   * gets called onload
   * creates a stateful query object that we pass to EmbedContainer to render the query
   * steps are as follows:
   * 1) initialize the embed sdk
   * 2) individual queries / visualizations are a function of the explore, we can initialize iframe using the following URL pattern
   * lastly, in the then callback, which gets called after creating the explore is successful,
   * we call setupQuery to save the explore to state so we can manipulate it later if we so desire
   */
  const embedCtrRef = useCallback((el) => {
    const hostUrl = "https://pbl.looker.com";
    if (el && hostUrl) {
      el.innerHTML = "";
      LookerEmbedSDK.init(hostUrl, "/api/auth");
      //qid cannot be copied across instances
      LookerEmbedSDK.createExploreWithUrl(
        `${hostUrl}/embed/query/atom_fashion/order_items?qid=1aI56YXY3jo5z4heutKPao&sdk=2`
      )
        .withNext()
        .appendTo(el)
        .build()
        .connect()
        .then(setupQuery)
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

export default EmbeddedQuery;
