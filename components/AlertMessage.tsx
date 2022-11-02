import React from "react";
import { stringOrNull } from "../types";

const AlertMessage = (props: { error: stringOrNull; warning: stringOrNull }) => {
  const { error, warning } = props;
  return (
    <div
      className={
        (error && "my-3 bg-red-300 p-3") ||
        (warning && "my-3 bg-yellow-100 p-3") ||
        ""
      }
    >
      <h1 className="text-lg" title="alert-message">
        {error}
        {warning}
      </h1>
    </div>
  );
};

export default AlertMessage;
