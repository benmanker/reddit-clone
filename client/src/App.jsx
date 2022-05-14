import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Profile from "./pages/Profile";
import { useState } from "react";
import Subreddit from "./pages/Subreddit";
import Post from "./pages/Post";
import Error from "./pages/Error";
import Login from "./pages/Login";
import { UserContext } from "./Contexts/UserContext";

function App() {
  const [username, setUsername] = useState("");

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      <Router>
        <nav>
          <br />
          <Link to="/">Home</Link>
          <br />
          <br />
          {username === "" ? (
            <Link to={`/account/login`}>Login</Link>
          ) : (
            <Link to={`/account/${username}`}>{username}</Link>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account/:username" element={<Account />} />
          <Route path="/account/login" element={<Login />} />
          <Route path="/subreddit/:subredditID" element={<Subreddit />} />
          <Route
            path="/subreddit/:subredditID/post/:postID"
            element={<Post />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
