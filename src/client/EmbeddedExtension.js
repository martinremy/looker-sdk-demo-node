/**
 * Created by Looker Data Applications Team 2021
 * These are simplified code snippets representing functionality on the page,
 * to view full implementation click the "Open Sandbox" button below
 */

//import necssary dependencies
import React, { useCallback } from "react";
import { LookerEmbedSDK } from "@looker/embed-sdk";
import { EmbedContainer } from "./EmbedContainer";

const EmbeddedExtension = ({ id }) => {
  //initialize state of extension
  const [extension, setExtension] = React.useState();

  const setupExtension = (extension) => {
    setExtension(extension);
  };

  /**
   * gets called onload
   * creates a stateful extension object that we pass to EmbedContainer to render the dashboard
   * steps are as follows:
   * 1) initialize the embed sdk
   * 2) create extension dashboard by passing in an id
   * lastly, in the then callback, which gets called after creating the extension is successful,
   * we call setupExtension to save the extension to state so we can manipulate it later if we so desire
   */
  const embedCtrRef = useCallback((el) => {
    const hostUrl = "https://pbl.looker.com";
    if (el && hostUrl) {
      el.innerHTML = "";
      LookerEmbedSDK.init(hostUrl, "/api/auth");
      LookerEmbedSDK.createExtensionWithId("query-builder-ef::query-builder")
        .appendTo(el)
        .build()
        .connect()
        .then(setupExtension)
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

export default EmbeddedExtension;
