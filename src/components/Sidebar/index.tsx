import React, { FC } from "react";
import { useLocation } from "wouter";
import { UnionIcon } from "~";
import { color, font, hrefIsActive } from "~/utils";
import { Link } from "../Link";

const SidebarItem: FC = ({ href, children, isActive }) => {
  return (
    <Link
      href={href}
      style={{
        width: 40,
        height: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
        borderRadius: 4,
        backgroundColor: isActive ? color("PrimaryLightSelected") : null,
        "&:hover": {
          backgroundColor: color("PrimaryLightHover"),
        },
        ...font("lg", "TextPrimary", 400),
      }}
    >
      {children}
    </Link>
  );
};

export const Sidebar = ({
  data = {},
  selected,
  prefix = "",
}: {
  data: object;
  selected?: string;
  prefix?: string;
}) => {
  const [location] = useLocation();
  if (!selected) {
    selected = location;
  }
  return (
    <div
      style={{
        backgroundColor: color("Background1dp"),
        borderRight: `1px solid ${color("OtherDivider")}`,
        width: 56,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 40,
      }}
    >
      {Object.keys(data).map((key) => {
        let href = data[key];
        let children = key[0];
        if (typeof href === "object") {
          if (Array.isArray(href)) {
            children = React.createElement(href[1]) || children;
            href = href[0];
          } else {
            children = React.createElement(href.icon) || children;
            href = href.href;
          }
        }
        return (
          <SidebarItem
            key={key}
            href={href}
            isActive={hrefIsActive(href, selected)}
          >
            {children}
          </SidebarItem>
        );
      })}
    </div>
  );
};
