const express = require("express");
const app = express();
app.use(express.json());
const router = require("./routers/reaction");

app.use(express.static('./routers/public/html'));

app.listen(process.env.PORT || 3000, console.log("server"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/routers/public/html/index.html');
});

app.use("/name_reaction", router);

