const PORT = 5000;

const app = require("express")();
const cors = require("cors");
const axios = require("axios");
const { json, urlencoded } = require("express");

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("HOME");
});

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  try {
    const name = username.split(" ");

    const response = await axios.put(
      "https://api.chatengine.io/users/",
      {
        username: username,
        secret: username + PORT,
        first_name: name[0],
        last_name: name[name.length - 1],
      },
      {
        headers: {
          "private-key": "cb31a706-ee6a-442e-a7a2-ee9d975a2828",
        },
      }
    );

    return res.status(response.status).send(response.data);
  } catch (error) {
    res.status(error.response.status).send({
      error: error.response.data,
      statusCode: error.response.status,
    });
  }
});

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON : http://localhost:${PORT}`);
});
