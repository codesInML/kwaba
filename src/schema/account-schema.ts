import { body, check } from "express-validator";

export const createAccountSchema = () => {
  return [
    check("accountType")
      .isIn(["Savings", "Current"])
      .withMessage("accountType can either be savings or current"),
    check("currency")
      .isIn(["NGN", "USD"])
      .withMessage("currency can either be NGN or USD"),
    body("passcode")
      .isNumeric()
      .withMessage("passcode must be numeric")
      .isLength({ min: 4, max: 4 })
      .withMessage("passcode must be 4 numbers"),
  ];
};
