import React from "react";

// Styling
import "../styles/TopicListItem.scss";


const TopicListItem = (props) => {
  return (
    <div className="topic-list__item">
      <span> {props.title} </span>
    </div>
  );
};

export default TopicListItem;
