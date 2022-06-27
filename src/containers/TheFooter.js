import React from "react";
import { getCurrentYear } from "../utils";

const TheFooter = (props) => {
  return (
    <div
      style={{
        bottom: "0px",
      }}
      className="text-center"
    >
      <small className="pb-3">{`\u00A9${getCurrentYear()} all right reserved`}</small>
    </div>
  );
};

export default TheFooter;
