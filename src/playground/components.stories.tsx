import React from "react";
import { AddIcon, Button, Provider, Text } from "~";
import { styled } from "inlines";

export const Buttons = ({ icon }) => {
  const colors = ["Primary", "Action", "Error"];
  const loadClick = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1e3));
  };
  const errorClick = async () => {
    await loadClick();
    throw Error("error");
  };
  return (
    <Provider>
      {colors.map((color) => {
        const states = [null, "hover", "disabled"];
        return (
          <div key={color} style={{ marginBottom: 24 }}>
            <Text weight={600}>{color}</Text>
            {states.map((state) => {
              const disabled = state === "disabled";
              const hover = state === "hover";
              return (
                <styled.div
                  key={state}
                  style={{
                    display: "flex",
                    margin: "0 -8px",
                    alignItems: "center",
                    "& > *": {
                      margin: "8px",
                    },
                  }}
                >
                  <Text style={{ width: 100 }}>{state}</Text>
                  <Button
                    iconLeft={icon}
                    disabled={disabled}
                    hover={hover}
                    color={color}
                    onClick={loadClick}
                  >
                    {color}
                  </Button>
                  <Button
                    iconLeft={icon}
                    disabled={disabled}
                    hover={hover}
                    color={color}
                    light
                    onClick={errorClick}
                  >
                    {color} Light
                  </Button>
                  <Button
                    iconLeft={icon}
                    disabled={disabled}
                    hover={hover}
                    color={color}
                    ghost
                  ></Button>
                  <Button
                    iconLeft={icon}
                    disabled={disabled}
                    hover={hover}
                    color={color}
                    outline
                  >
                    {color} Outline
                  </Button>
                  <Button
                    iconLeft={icon}
                    iconRight={icon}
                    disabled={disabled}
                    hover={hover}
                    color={color}
                    outline
                    light
                  >
                    {color} Outline Light
                  </Button>
                  <Button
                    iconLeft={icon}
                    iconRight={icon}
                    disabled={disabled}
                    hover={hover}
                    color={color}
                    outline
                    light
                    loading
                  >
                    {color} Outline Light
                  </Button>
                </styled.div>
              );
            })}
          </div>
        );
      })}
    </Provider>
  );
};

export const ButtonsWithIcons = () => <Buttons icon={AddIcon} />;
