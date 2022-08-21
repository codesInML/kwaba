import { body, check } from "express-validator";

export const createSavingSchema = () => {
  return [
    body("title").notEmpty().withMessage("please provide a saving title"),
    body("numberOfBuddies")
      .notEmpty()
      .withMessage("please provide a number of buddies"),
    check("hasTarget")
      .isIn(["yes", "no"])
      .withMessage("target must be either yes or no"),
    check("savingType")
      .isIn(["Manual", "Automatic"])
      .withMessage("type must be either Manual or Automatic"),
    check("frequency")
      .isIn(["daily", "weekly", "monthly"])
      .withMessage("frequency can either be daily, weekly or monthly"),
    body("amount")
      .notEmpty()
      .withMessage("Please provide your saving amount")
      .isNumeric()
      .withMessage("amount must be numeric"),
    body("duration")
      .notEmpty()
      .withMessage("please provide your saving duration"),
    body("startDate").isDate(),
    body("endDate").isDate(),
    body("relationship")
      .notEmpty()
      .withMessage("what relationship do you have with your buddies"),
  ];
};

export const inviteUserSchema = () => {
  return [
    body("tag")
      .notEmpty()
      .withMessage("please provide the tag of the user to invite"),
    body("savingID")
      .notEmpty()
      .withMessage("please provide the id of the saving")
      .isNumeric()
      .withMessage("savingID must be a number"),
  ];
};

export const updateInviteSchema = () => {
  return [
    body("inviteID")
      .isNumeric()
      .withMessage("inviteID must be a number")
      .notEmpty()
      .withMessage("please provide your invite id"),
    check("status")
      .isIn(["accept", "decline"])
      .withMessage("you can only accept or decline an invite"),
  ];
};
