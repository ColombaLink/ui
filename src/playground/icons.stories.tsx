import React from "react";
import * as icons from "../icons";
import { Provider } from "~";

export const Overview = () => (
  <Provider style={{ display: "flex", flexWrap: "wrap" }}>
    {Object.keys(icons).map((name, index) => (
      <div style={{ margin: 16 }} key={index}>
        {React.createElement(icons[name])}
        <div
          style={{
            marginTop: 8,
          }}
        >
          {name}
        </div>
      </div>
    ))}
  </Provider>
);
