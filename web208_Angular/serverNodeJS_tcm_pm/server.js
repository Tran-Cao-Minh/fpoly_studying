const exp = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const jwt = require("node-jsonwebtoken");
const cors = require("cors");

const app = exp();
const port = 8088;
const PRIVATE_KEY = fs.readFileSync("private-key.txt");

const mysql = require("mysql");

const connect = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "0937",
  database: "angular",
  port: 3306,
});
connect.connect((err) => {
  if (err) throw err;
  console.log("connected");
});

app.use(bodyParser.json());
app.use(cors());

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const sql = `
    SELECT * 
    FROM user 
    WHERE username = '${username}' 
    AND password = '${password}'
    LIMIT 1
  `;
  // console.log(sql);
  connect.query(sql, (err, userInfo) => {
    if (err) throw err;
    // console.log("userInfo");
    // console.log(userInfo[0]);

    if (userInfo[0] !== undefined) {
      const jwtBearerToken = jwt.sign({}, PRIVATE_KEY, {
        algorithm: "RS256",
        expiresIn: 120,
        subject: String(userInfo[0].id),
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
});

app.post("/change-pass", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const newPassword = req.body.newPassword;

  const sql = `
    UPDATE user
    SET password = '${newPassword}'
    WHERE username = '${username}' 
    AND password = '${password}'
    LIMIT 1
  `;
  // console.log(sql);
  connect.query(sql, (err, data) => {
    if (err) throw err;

    console.log("change-pass-data");
    console.log(data.affectedRows);

    if (data.affectedRows !== 0) {
      res.status(200).json({
        message: "Change Password Success",
      });
    } else {
      res.sendStatus(401);
    }
  });
});

app.listen(port, () => {
  console.log(`App is running with port: ${port}`);
});
