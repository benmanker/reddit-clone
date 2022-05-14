import React from "react";

function CommentCard(props) {
  return (
    <div key={props.comment.comment_id}>
      <h5>by: {props.comment.created_by}</h5>
      <p>Posted At: {props.comment.created_at}</p>
      <p>{props.comment.body}</p>
      <p>comment id: {props.comment.comment_id}</p>
    </div>
  );
}

export default CommentCard;
