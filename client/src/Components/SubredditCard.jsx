import React from "react";
import { Link } from "react-router-dom";

function SubredditCard(props) {
  return (
    <div key={props.subreddit.subreddit_id}>
      <Link to={"/subreddit/" + props.subreddit.subreddit_id}>
        <h3>{props.subreddit.title}</h3>
      </Link>
      <p>Description: {props.subreddit.description}</p>
      <p>
        Created By: {props.subreddit.created_by} on {props.subreddit.created_on}
      </p>
    </div>
  );
}

export default SubredditCard;
