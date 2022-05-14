import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import SubredditCard from "../Components/SubredditCard";

function Home() {
  const [subredditsList, setSubredditsList] = useState([]);

  useEffect(() => {
    document.title = "Reddit Clone by Ben Manker";
    loadSubreddits();
  }, []);

  const loadSubreddits = () => {
    Axios.get("http://localhost:3001/api/all_subreddits").then((response) => {
      setSubredditsList(response.data);
    });
  };

  let navigate = useNavigate();
  const subredditID = 5;

  return (
    <>
      <br />
      <h3>Welcome to Phase 3 of my project!</h3>
      <h4>All Subreddits:</h4>
      {subredditsList.map((subreddit) => {
        return <SubredditCard subreddit={subreddit} />;
      })}
    </>
  );
}

export default Home;
