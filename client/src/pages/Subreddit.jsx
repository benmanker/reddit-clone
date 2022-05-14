import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import PostCard from "../Components/PostCard";

function Subreddit() {
  let navigate = useNavigate();
  let { subredditID } = useParams();
  const [subredditInfo, setSubredditInfo] = useState({});
  const [subredditPosts, setSubredditPosts] = useState([]);
  const [clicked, setClicked] = useState(0);
  const [newPostTitle, setNewPostTile] = useState("");
  const [newPostBody, setNewPostBody] = useState("");

  // ON LOAD
  useEffect(() => {
    document.title = `Subreddit - ${subredditID}`; // do subreddit name
    loadPosts();
    loadSubredditInfo();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // GET SUBREDDIT INFO
  const loadSubredditInfo = () => {
    Axios.get(
      "http://localhost:3001/api/subreddit",
      { params: { id: subredditID } },
      {
        headers: {
          "content-type": "pplication/x-www-form-urlencoded",
        },
      }
    ).then((response) => {
      setSubredditInfo(response.data[0]);
    });
  };

  // GET ALL POSTS
  const loadPosts = () => {
    Axios.get(
      "http://localhost:3001/api/subreddit/posts",
      { params: { id: subredditID } },
      {
        headers: {
          "content-type": "pplication/x-www-form-urlencoded",
        },
      }
    ).then((response) => {
      setSubredditPosts(response.data);
    });
  };

  const changeSetClicked = () => {
    setClicked(1);
  };

  const insertPost = () => {
    Axios.get(
      "http://localhost:3001/api/subreddit/new_post",
      {
        params: {
          subreddit_id: subredditID,
          created_by: "benmanker",
          title: newPostTitle,
          body: newPostBody,
        },
      },
      {
        headers: {
          "content-type": "pplication/x-www-form-urlencoded",
        },
      }
    ).then(() => {});
    navigate("/subreddit/" + subredditID);
  };

  return (
    <>
      <br />
      <h3>r/{subredditInfo.title}</h3>
      <p>{subredditInfo.description}</p>
      <p>Created By: {subredditInfo.created_by}</p>
      <br />
      <button onClick={changeSetClicked}>Create Post</button>
      {clicked ? (
        <div>
          <br />
          <label>New Post Title </label>
          <input
            type="text"
            onChange={(e) => {
              setNewPostTile(e.target.value);
            }}
          />
          <br />
          <br />
          <label>New Post Body </label>
          <input
            type="text"
            onChange={(e) => {
              setNewPostBody(e.target.value);
            }}
          />
          <br />
          <br />
          <button onClick={insertPost}>Submit</button>
        </div>
      ) : (
        <></>
      )}
      {subredditPosts.map((post) => {
        return <PostCard post={post} />;
      })}
    </>
  );
}

export default Subreddit;
