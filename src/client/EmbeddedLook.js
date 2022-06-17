/**
 * Created by Looker Data Applications Team 2021
 * These are simplified code snippets representing functionality on the page,
 * to view full implementation click the "Open Sandbox" button below
 */

//import necssary dependencies
import React, { useCallback } from "react";
import { LookerEmbedSDK } from "@looker/embed-sdk";
import { EmbedContainer } from "./EmbedContainer";

const EmbeddedLook = () => {
  //initialize state of look
  const [look, setLook] = React.useState();

  const setupLook = (look) => {
    setLook(look);
  };

  /**
   * gets called onload
   * creates a stateful look object that we pass to EmbedContainer to render the explore
   * steps are as follows:
   * 1) initialize the embed sdk
   * 2) create embedded look by passing in an id
   * lastly, in the then callback, which gets called after creating the look is successful,
   * we call setupLook to save the look to state so we can manipulate it later if we so desire
   */
  const embedCtrRef = useCallback((el) => {
    const hostUrl = "https://pbl.looker.com";
    if (el && hostUrl) {
      el.innerHTML = "";
      LookerEmbedSDK.init(hostUrl, "/api/auth");
      LookerEmbedSDK.createLookWithId("7")
        .appendTo(el)
        .build()
        .connect()
        .then(setupLook)
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

export default EmbeddedLook;
