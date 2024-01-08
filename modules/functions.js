import { emailFormatChecker } from "../helperFunctions/checker.js";
import { emailModel } from "../models/emailModel.js";
import { imageModel } from "../models/imageModel.js";
import { textModel } from "../models/textModel.js";
import { baseError } from "./errorHandling.js";

export const uploadImageDetails = async (request, response, next) => {
  try {
    const place = await imageModel.findOne({ place: request.body.place });
    if (place === null) {
      const placeImage = await new imageModel({
        place: request.body.place,
        imageUrl: `http://localhost:5000/Images/${request.file.filename}`,
        imageName: request.file.filename,
      }).save();
      if (placeImage?._id) {
        return response.status(200).json({
          data: null,
          message: "logo has been set succesfully",
          success: true,
        });
      } else {
        return next(new Error("Failed to add"));
      }
    } else {
      const responseAfterUpdate = await imageModel.findOneAndUpdate(
        {
          place: request.body.place,
        },
        {
          $set: {
            place: request.body.place,
            imageUrl: `http://localhost:5000/Images/${request.file.filename}`,
            imageName: request.file.filename,
          },
        },
        { new: true }
      );
      if (responseAfterUpdate?._id) {
        return response.status(200).json({
          data: null,
          message: "logo updated successfully",
          success: true,
        });
      }
      response.status(400);
      return next(new Error("Failed to update details."));
    }
  } catch (error) {
    next(error);
  }
};

export const getImageDetails = async (request, response, next) => {
  const { place } = request.params;
  try {
    const imageData = await imageModel.findOne({ place: place });
    if (imageData === null) {
      response.status(400);
      return next(new Error("no images found"));
    }
    return response.status(200).json({
      imageData: imageData,
      message: "logo updated successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const addNewText = async (request, response, next) => {
  try {
    const place = await textModel.findOne({ place: request.body.place });
    if (place === null) {
      const newText = await new textModel({
        place: request.body.place,
        text: request.body.newText,
      }).save();
      if (newText?._id) {
        return response.status(200).json({
          data: null,
          message: "text has been change succesfully",
          success: true,
        });
      } else {
        return next(new Error("Failed to text"));
      }
    } else {
      const responseAfterUpdate = await textModel.findOneAndUpdate(
        {
          place: request.body.place,
        },
        {
          $set: {
            place: request.body.place,
            text: request.body.newText,
          },
        },
        { new: true }
      );
      if (responseAfterUpdate?._id) {
        return response.status(200).json({
          data: null,
          message: "text updated successfully",
          success: true,
        });
      }
      return response.status(400).json({
        textData: textData,
        message: "Failed to update text.",
        success: false,
      })
    }
  } catch (error) {
    next(error);
  }
};

export const getText = async (request, response, next) => {
  const { place } = request.params;
  try {
    const textData = await textModel.findOne({ place: place });
    if (textData === null) {
      return response.status(400).json({
        textData: textData,
        message: "no images found",
        success: false,
      })
    }
    return response.status(200).json({
      textData: textData,
      message: "logo updated successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const uploadEmail = async (request, response, next) => {
  try {
    if (!emailFormatChecker(request.body.email)) {
      return response.status(500).json({
        data: null,
        message: "Invalid email address",
        success: false,
      });
    }
    const data = await emailModel.findOne({ email: request.body.email });
    if (data === null) {
      const newEmail = await new emailModel({
        email: request.body.email,
      }).save();
      if (newEmail?._id) {
        return response.status(200).json({
          data: null,
          message: "subscribe succesfully",
          success: true,
        });
      } else {
        return next(new Error("Failed to subscribe"));
      }
    } else {
      return response.status(200).json({
        data: null,
        message: "already subscribed",
        success: true,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getAllEmail = async (request, response, next) => {
  try {
    const data = await emailModel.find();
    if (!data) {
      return response.status(400).json({
        data: null,
        message: "no emails",
        success: false,
      });
    }
    return response.status(200).json({
      emails: data,
      message: "all emails",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEmail = async (request, response, next) => {
  try {
    const { id } = request.params;
    const responseAfterItemDeletion = await emailModel.findByIdAndDelete({_id: id});
    if (responseAfterItemDeletion?.id) {
      return response.status(200).json({
        data: responseAfterItemDeletion,
        message: "Item deleted successfully.",
        success: true,
      });
    }
  } catch (error) {
    next(error);
  }
}