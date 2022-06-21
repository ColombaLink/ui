import React from "react";
import * as icons from "../icons";
import { Provider } from "~";

export const Overview = () => (
  <Provider style={{ display: "block", flexWrap: "wrap" }}>
    <icons.AddIcon size={16} color={"red"} />
    <icons.AlignCenterIcon size={16} color={"purple"} />

    {Object.keys(icons).map((name, index) => (
      <div
        style={{
          margin: 12,
          display: "flex",
          alignItems: "center",
        }}
        key={index}
      >
        {React.createElement(icons[name])}
        <div
          style={{
            marginLeft: 16,
          }}
        >
          {name}
        </div>
      </div>
    ))}
  </Provider>
);
