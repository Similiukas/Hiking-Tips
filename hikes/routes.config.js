const HikesController = require("./controllers/hikes.controller");

exports.routesConfig = (app) =>{
    app.get("/api/about", [
        HikesController.about
    ]);
    app.post("/api/all", [
        HikesController.all
    ])
    app.post("/api/food", [
        HikesController.food
    ]);
    app.post("/api/shelter", [
        HikesController.shelter
    ]);
    app.post("/api/misc", [
        HikesController.misc
    ]);
    app.post("/form-submit", [
        HikesController.all
    ])
}