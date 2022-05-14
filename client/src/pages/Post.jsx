import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import CommentCard from "../Components/CommentCard";
import { UserContext } from "../Contexts/UserContext";
import { useNavigate } from "react-router-dom";

function Post() {
  let { postID } = useParams(); // can catch subredditID here if needed
  const [postInfo, setPostInfo] = useState({});
  const [postComments, setPostComments] = useState([]);
  const { username } = useContext(UserContext);
  var navigate = useNavigate();

  useEffect(() => {
    getPost();
    getPostComments();
    document.title = `Post - ${postID}`; // do post title here
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getPost = () => {
    Axios.get(
      "http://localhost:3001/api/post",
      { params: { id: postID } },
      {
        headers: {
          "content-type": "pplication/x-www-form-urlencoded",
        },
      }
    ).then((response) => {
      setPostInfo(response.data[0]);
    });
  };

  const getPostComments = () => {
    Axios.get(
      "http://localhost:3001/api/post/comments",
      { params: { id: postID } },
      {
        headers: {
          "content-type": "pplication/x-www-form-urlencoded",
        },
      }
    ).then((response) => {
      setPostComments(response.data);
    });
  };

  const deletePost = () => {
    Axios.get(
      "http://localhost:3001/api/delete_post",
      { params: { id: postID } },
      {
        headers: {
          "content-type": "pplication/x-www-form-urlencoded",
        },
      }
    ).then(() => {});
    navigate("/subreddit/" + postInfo.subreddit_id);
  };

  return (
    <>
      <br />
      <h3>{postInfo.title}</h3>
      <p>{postInfo.body}</p>
      <p>Created By: {postInfo.created_by}</p>
      <br />
      <p>post_id: {postInfo.post_id}</p>
      <p>created_at: {postInfo.created_at}</p>
      {postInfo.created_by == username ? (
        <button onClick={deletePost}>Delete Post</button>
      ) : (
        <></>
      )}
      <br />
      <h3>Comments</h3>
      {postComments.map((comment) => {
        return <CommentCard comment={comment} />;
      })}
      {postComments.data == null ? <p>This post has no comments.</p> : <p></p>}
    </>
  );
}

export default Post;
