import express from "express";
import { uploadImages } from "../helperFunctions/imageUploader.js";
import { addNewText, deleteEmail, getAllEmail, getImageDetails, getText, uploadEmail, uploadImageDetails } from "./functions.js";

const route = express.Router();

route.use("/Images", express.static("upload/Images"));

route.get("/api", function (req, res, next) {
    res.send("api working");
});

route.post("/upload-images", uploadImages.single("image"),uploadImageDetails)
route.post("/add-new-text",addNewText);
route.post("/subscribe", uploadEmail);

route.get("/get-images/:place",getImageDetails);
route.get("/get-text/:place", getText);
route.get("/get-emails",getAllEmail);

route.delete("/delete-email/:id",deleteEmail);



export default route;