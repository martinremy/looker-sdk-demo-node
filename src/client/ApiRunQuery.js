/**
 * Created by Looker Data Applications Team
 * 2021
 */
//import necssary dependencies
import React, { useState, useEffect } from "react";
import { getSdk } from "../utils/client/looker_sdk";

const ApiRunQuery = () => {
  //initialize sdk in order to start making calls
  const sdk = getSdk();

  //initialize state for data
  const [data, setData] = useState();

  //call getTest function onload
  useEffect(() => {
    getTest();
  }, []);

  /**
   * inside of try/catch statement
   * await results of call to run_query api call
   * passing in a specific query_id and desired format
   * after a successful call, save results to our data state
   */
  const getTest = async () => {
    try {
      const results = await sdk.ok(
        sdk.run_query({
          query_id: 970,
          result_format: "json"
        })
      );
      setData(results);
    } catch (e) {
      console.log({ e });
    }
  };
  return (
    <code style={{ whiteSpace: "pre" }}>{JSON.stringify(data, null, 2)}</code>
  );
};
export default ApiRunQuery;
