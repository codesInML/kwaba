import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors";
import { successResponse } from "../helpers";
import {
  createSavingService,
  getAllUserInviteService,
  getUserSavingsService,
  inviteUserService,
  updateInviteService,
} from "../services";

export const createSavingController = async (req: Request, res: Response) => {
  const {
    title,
    numberOfBuddies,
    hasTarget,
    savingType,
    frequency,
    amount,
    duration,
    startDate,
    endDate,
    relationship,
  } = req.body;

  const saving = await createSavingService({
    title,
    numberOfBuddies,
    hasTarget,
    savingType,
    frequency,
    amount,
    duration,
    startDate,
    endDate,
    relationship,
    createdBy: +req.currentUser?.id!,
  });

  if (!saving) throw new BadRequestError("something went wrong");

  return successResponse(res, StatusCodes.CREATED, saving);
};

export const inviteToSavingController = async (req: Request, res: Response) => {
  const { savingID, tag } = req.body;

  const invite = await inviteUserService(+savingID, +req.currentUser?.id!, tag);

  if (!invite) throw new BadRequestError("something went wrong");
  if (typeof invite == "string") throw new BadRequestError(invite);

  return successResponse(res, StatusCodes.CREATED, invite);
};

export const getSavingsController = async (req: Request, res: Response) => {
  const account = await getUserSavingsService(+req.currentUser?.id!);
  if (!account) throw new BadRequestError("User does not have an account");

  return successResponse(res, StatusCodes.OK, account);
};

export const getAllUserInvitesController = async (
  req: Request,
  res: Response
) => {
  const invites = await getAllUserInviteService(+req.currentUser?.id!);
  return successResponse(res, StatusCodes.OK, invites);
};

export const updateInviteController = async (req: Request, res: Response) => {
  let { status, inviteID } = req.body;

  status = status == "accept" ? "ACCEPTED" : "DECLINED";
  const invite = await updateInviteService(
    status,
    +inviteID,
    +req.currentUser?.id!
  );

  if (!invite) throw new BadRequestError("something went wrong");
  if (typeof invite == "string") throw new BadRequestError(invite);

  return successResponse(res, StatusCodes.CREATED, invite);
};
