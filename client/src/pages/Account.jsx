import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import Axios from "axios";
import PostCard from "../Components/PostCard";
import CommentCard from "../Components/CommentCard";

function Account() {
  let navigate = useNavigate();
  let { username } = useParams();
  const { setUsername } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({});
  const [usersPosts, setUsersPosts] = useState([]);
  const [usersComments, setUsersComments] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    getUserInfo();
    getUsersPosts();
    getUsersComments();
    getTotalPosts();
    document.title = `Account - ${username}`;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getUserInfo = () => {
    Axios.get(
      "http://localhost:3001/api/user",
      { params: { id: username } },
      {
        headers: {
          "content-type": "pplication/x-www-form-urlencoded",
        },
      }
    ).then((response) => {
      setUserInfo(response.data[0]);
    });
  };

  const deleteUser = () => {
    console.log("delete user feature not availible");
  };

  const getUsersPosts = () => {
    Axios.get(
      "http://localhost:3001/api/user/all_posts",
      { params: { id: username } },
      {
        headers: {
          "content-type": "pplication/x-www-form-urlencoded",
        },
      }
    ).then((response) => {
      setUsersPosts(response.data);
    });
  };

  const getUsersComments = () => {
    Axios.get(
      "http://localhost:3001/api/user/all_comments",
      { params: { id: username } },
      {
        headers: {
          "content-type": "pplication/x-www-form-urlencoded",
        },
      }
    ).then((response) => {
      // console.log(response);
      setUsersComments(response.data);
    });
  };

  const getTotalPosts = () => {
    Axios.get(
      "http://localhost:3001/api/user/posts_sum",
      { params: { id: username } },
      {
        headers: {
          "content-type": "pplication/x-www-form-urlencoded",
        },
      }
    ).then((response) => {
      setTotalPosts(response.data[0].total);
    });
  };

  return (
    <>
      <br />
      <h3>Hi, {username}! This is your account page.</h3>
      <button
        onClick={() => {
          setUsername("");
          navigate("/");
        }}
      >
        Sign Out
      </button>
      <br />
      <br />
      <p>user_id: {userInfo.user_id}</p>
      <p>password: {userInfo.password}</p>
      <p>Fname: {userInfo.Fname}</p>
      <p>Lname: {userInfo.Lname}</p>
      <p>email: {userInfo.email}</p>
      <p>last_login: {userInfo.last_login ? userInfo.last_login : "NULL"}</p>
      <p>created_at: {userInfo.created_at}</p>
      <button onClick={deleteUser}>Permanently Delete Account</button>
      <br />
      <br />
      <h3>All posts made by you:</h3>
      <p>Total Number of Posts: {totalPosts}</p>
      {usersPosts.map((post) => {
        return <PostCard post={post} />;
      })}
      <br />
      <h3>All comments made by you:</h3>
      {usersComments.map((comment) => {
        return <CommentCard comment={comment} />;
      })}
    </>
  );
}

export default Account;
