import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors";
import { successResponse } from "../helpers";
import { createAccountService, getAccountService } from "../services";

export const createAccountController = async (req: Request, res: Response) => {
  const { currency, accountType, passcode } = req.body;
  const account = await createAccountService({
    currency,
    type: accountType,
    passcode: `${passcode}`,
    userID: req.currentUser?.id!,
  });

  if (!account) throw new BadRequestError("User already has an account");

  delete account.passcode;
  return successResponse(res, StatusCodes.CREATED, account);
};

export const getAccountController = async (req: Request, res: Response) => {
  const account = await getAccountService(req.currentUser?.id!);
  if (!account) throw new BadRequestError("User does not have an account");

  delete account.passcode;
  return successResponse(res, StatusCodes.OK, account);
};
