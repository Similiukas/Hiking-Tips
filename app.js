const express = require("express");
const cors = require("cors");
const compression = require("compression");
const path = require("path")
const HikesRouter = require("./hikes/routes.config");

const app = express();

const port = process.env.PORT || 3003;
// Using gzip compression
app.use(compression());
// Setting CORS
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
// Default parameters for all requests
app.use((req, res, next) => {
    if (req.method === "OPTIONS"){
        return res.sendStatus(200);
    }
    else next();
})


app.use(express.urlencoded({ extended: true }));
app.use(express.json({
    verify : (req, res, buf, encoding) => {
        if (req.method === "POST") {
            try {
                JSON.parse(buf);
            } catch(e) {
                res.status(400).send('Invalid JSON format').end();
                throw Error('invalid JSON');
            }
        }
    }
}));

HikesRouter.routesConfig(app);

app.listen(port, () =>{
    console.log("App listening on port", port);
})