import mongoose from "mongoose";

const textSchema = new mongoose.Schema({
    place: {type: String},
    text: {type: String},
});

export const textModel = mongoose.model("changeText", textSchema);