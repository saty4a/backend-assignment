import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({
    email: {type: String},
});

export const emailModel = mongoose.model("email", emailSchema);