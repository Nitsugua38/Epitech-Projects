const express = require("express");
const cors = require("cors")

const app = express();
const PORT = 3000;

const DeleteUser = require("./routes/delete/user_Id.js");
const DeletePost = require("./routes/delete/post_Id.js");

const PostNewUser = require("./routes/post/register.js");
const PostNewPost = require("./routes/post/post.js");
const CheckUser = require("./routes/post/login.js");

const GetPosts = require("./routes/get/post.js");
const GetPostById = require("./routes/get/post_id.js");
const GetUser = require("./routes/get/user.js");
const GetUserPost = require("./routes/get/user_post.js");
const GetUserByIdOrEmail = require("./routes/get/user:id_:email.js");
const bodyParser = require('body-parser')

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors({origin: ["*"]}));

app.use(bodyParser.json())

// DELETE
app.use("/user", DeleteUser);
app.use("/post", DeletePost);
//POST
app.use("/post", PostNewPost);
app.use("/user", PostNewUser);
app.use("/auth", CheckUser);
//GET
app.use("/post", GetPosts);
app.use("/post", GetPostById);
app.use("/user", GetUser);
app.use("/user", GetUserPost);
app.use("/user", GetUserByIdOrEmail);


app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});