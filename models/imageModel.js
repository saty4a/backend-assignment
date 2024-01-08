import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    place: {type: String},
    imageUrl: {type: String},
    imageName: {type: String}
});

export const imageModel = mongoose.model("image", imageSchema);