const HikesModel = require("../models/hike.model");

exports.about = (req, res) => {
    res.status(200).send("Welcome to the hiking api, to know all about it, read the https://github.com/Similiukas/Hiking-Tips").end();
}

exports.all = (req, res) => {
    const info = HikesModel.all(req.body);
    if (info === null) {
        res.status(400).send({ error: "Missing required parameter" });
    }
    else if (info === undefined) {
        res.status(500).send({ error: "Server experienced an error" });
    }
    res.status(200).send(info);
}

exports.food = (req, res) => {
    console.log("food");
    const info = HikesModel.food(req.body);
    if (!info) {
        res.status(400).send({ error: "Missing required parameter" });
    }
    else if (info === undefined) {
        res.status(500).send({ error: "Server experienced an error" });
    }
    res.status(200).send(info);
}

exports.shelter = (req, res) => {
    console.log("shelter");
    const info = HikesModel.shelter(req.body);
    if (!info) {
        res.status(400).send({ error: "Missing required parameter" });
    }
    else if (info === undefined) {
        res.status(500).send({ error: "Server experienced an error" });
    }
    res.status(200).send(info);
}

exports.misc = (req, res) => {
    const info = HikesModel.misc(req.body);
    if (!info) {
        res.status(400).send({ error: "Missing required parameter" });
    }
    else if (info === undefined) {
        res.status(500).send({ error: "Server experienced an error" });
    }
    res.status(200).send(info);
}