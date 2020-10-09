import React from "react";
import "./StatusAnnouncement.css";
const StatusAnnouncement = (props) => {

  return (
    <div className={`status-announcement ${props.type === "success" ? "success" : "error"}`}>
      {props.message}
    </div>
  )
};

export default StatusAnnouncement;