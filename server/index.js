const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
//app.options("*", cors({ origin: 'http://localhost:000'}));

// DATABASE CONNECTION
const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "Reddit-Clone-DB",
  waitForConnections: true,
  connectionLimit: 100000,
  queueLimit: 0,
});

// 1. GET ALL SUBREDDITS FOR HOME THE PAGE
app.get("/api/all_subreddits", (req, res) => {
  const command = "SELECT * FROM Subreddits;";
  pool.query(command, (err, result) => {
    res.send(result);
    err ? console.log(err) : console.log(result);
  });
});

// 2. GET ALL POSTS FOR A SUBREDDIT
app.get("/api/subreddit/posts", (req, res) => {
  const subredditID = req.query.id;
  const command = "SELECT * FROM Posts WHERE subreddit_id = ?";
  pool.query(command, subredditID, (err, result) => {
    res.send(result);
    err ? console.log(err) : console.log(result);
  });
});

// 3. GET INFO FOR A SUBREDDIT
app.get("/api/subreddit", (req, res) => {
  const subredditID = req.query.id;
  const command = "SELECT * FROM Subreddits WHERE subreddit_id = ?";
  pool.query(command, subredditID, (err, result) => {
    res.send(result);
    err ? console.log(err) : console.log(result);
  });
});

// 4. GET ONE SPECIFIC POST
app.get("/api/post", (req, res) => {
  const postID = req.query.id;
  const command = "SELECT * FROM Posts WHERE post_id = ?";
  pool.query(command, postID, (err, result) => {
    res.send(result);
    err ? console.log(err) : console.log(result);
  });
});

// 5. GET ALL COMMENTS FOR A POST
app.get("/api/post/comments", (req, res) => {
  const id = req.query.id;
  const command = "SELECT * FROM Comments WHERE post_id = ?";
  pool.query(command, id, (err, result) => {
    res.send(result);
    err ? console.log(err) : console.log(result);
  });
});

// GET THE TOTAL AMOUNT OF POSTS FOR A USER
app.get("/api/user/posts_sum", (req, res) => {
  const id = req.query.id;
  const command =
    "SELECT COUNT(post_id) AS total FROM Posts WHERE created_by = ?";
  pool.query(command, id, (err, result) => {
    res.send(result);
    err ? console.log(err) : console.log(result);
  });
});

// 6. GET POST VOTES (SPECIFIC USER AND POST)

// 7. GET COMMENT VOTES (SPECIFIC USER AND COMMMENT)

// 8. GET USER INFO (for a specific user)
app.get("/api/user", (req, res) => {
  const userID = req.query.id;
  const command = "SELECT * FROM Users WHERE user_id = ?";
  pool.query(command, userID, (err, result) => {
    res.send(result);
    err ? console.log(err) : console.log(result);
  });
});

// 9. DELETE POST
app.get("/api/delete_post", (req, res) => {
  const id = req.query.id;
  const command = "DELETE FROM Posts WHERE post_id = ?";
  pool.query(command, id, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

// 10. CREATE POST
app.get("/api/subreddit/new_post", (req, res) => {
  const subreddit_id = req.query.subreddit_id;
  const created_by = req.query.created_by;
  const title = req.query.title;
  const body = req.query.body;
  const command =
    "INSERT INTO Posts (subreddit_id, created_by, title, body) VALUES (?,?,?,?)";
  pool.query(
    command,
    [subreddit_id, created_by, title, body],
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );
});

// 9. VALIDATE USER CREDENTIALS
app.get("/api/validate_user", (req, res) => {
  const id = req.query.id;
  const ps = req.query.ps;
  const command = "SELECT * FROM Users WHERE user_id = ? AND password = ?";
  pool.query(command, [id, ps], (err, result) => {
    res.send(result);
    err ? console.log(err) : console.log(result);
  });
});

// 9. GET ALL POSTS BELONGING TO A USER
app.get("/api/user/all_posts", (req, res) => {
  const id = req.query.id;
  const command = "SELECT * FROM Posts WHERE created_by = ?;";
  pool.query(command, id, (err, result) => {
    res.send(result);
    err ? console.log(err) : console.log(result);
  });
});

// 10. GET ALL COMMENTS BELONGING TO A USER
app.get("/api/user/all_comments", (req, res) => {
  const id = req.query.id;
  const command = "SELECT * FROM Comments WHERE created_by = ?;";
  pool.query(command, id, (err, result) => {
    res.send(result);
    err ? console.log(err) : console.log(result);
  });
});

// 10. CHECK FOR USERNAME AND PASSWORD IN USER TABLE

// START SERVER
const port = 3001;
app.listen(port, () => {
  console.log("Server Started Successfully on Port: " + port);
});
