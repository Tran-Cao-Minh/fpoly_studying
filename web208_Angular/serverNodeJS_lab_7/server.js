const exp = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const jwt = require("node-jsonwebtoken");
const cors = require("cors");

const app = exp();
const port = 3000;
const PRIVATE_KEY = fs.readFileSync("private-key.txt");

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>This is Home page</1>");
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (checkUserPass(username, password)) {
    const userInfo = getUserInfo(username);
    const jwtBearerToken = jwt.sign({}, PRIVATE_KEY, {
      algorithm: "RS256",
      expiresIn: 120,
      subject: userInfo.id,
    });
    res.cookie("SESSIONID", jwtBearerToken, {
      httpOnly: true,
      secure: false,
    });
    res.status(200).json({
      idToken: jwtBearerToken,
      expiresIn: 120,
    });
  } else {
    res.sendStatus(401);
  }
});

checkUserPass = (username, password) => {
  if (username === "aa" && password === "123") {
    return true;
  }
  if (username === "bb" && password === "321") {
    return true;
  }
  return false;
};

getUserInfo = (username) => {
  if (username === "aa") return { id: "1", fullname: "Nguyễn Văn Tèo" };
  if (username === "bb") return { id: "2", fullname: "Nguyễn Thị Lượm" };
  return { id: "-1", fullname: "" };
};

app.listen(port, () => {
  console.log(`App is running with port: ${port}`);
});
