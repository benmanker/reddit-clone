import React from "react";
import { Link } from "react-router-dom";

function PostCard(props) {
  return (
    <div key={props.post.post_id}>
      <Link
        to={
          "/subreddit/" +
          props.post.subreddit_id +
          "/post/" +
          props.post.post_id
        }
      >
        <h3>{props.post.title}</h3>
      </Link>

      <p>Body: {props.post.body}</p>
      <p>
        Created By: {props.post.created_by} on {props.post.created_at}
      </p>
    </div>
  );
}

export default PostCard;
