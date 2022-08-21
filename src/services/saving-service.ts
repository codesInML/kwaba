import knex from "../db";
import { Model } from "../helpers";
import { customAlphabet } from "nanoid";
import Logger from "../logger";

const nanoid = customAlphabet("0123456789", 10);

type SavingData = {
  id: number;
  title: string;
  numberOfBuddies: string;
  createdBy: number;
  hasTarget: string;
  savingType: string;
  frequency: string;
  amount: string;
  duration: string;
  startDate: string;
  endDate: string;
  relationship: string;
  createdAt: string;
  updatedAt: string;
};

export const createSavingService = async (
  data: Omit<SavingData, "id" | "createdAt" | "updatedAt">
): Promise<SavingData | null> => {
  try {
    const [id] = await knex(Model.saving).insert(data);

    const user = await knex(Model.saving).select("*").where({ id });

    return user[0];
  } catch (error) {
    Logger.error(error);
    return null;
  }
};

export const getUserSavingsService = async (userID: number) => {
  try {
    const savings: SavingData[] = await knex(Model.saving)
      .select("*")
      .where({ createdBy: userID });
    return savings;
  } catch (error) {
    Logger.error(error);
    return null;
  }
};

export const inviteUserService = async (
  savingId: number,
  from: number,
  tag: string
) => {
  try {
    const saving: SavingData = (
      await knex(Model.saving).select("*").where({ id: savingId })
    )[0];

    if (!saving) return "saving does not exist";
    if (saving.createdBy !== from)
      return "only saving's creator can send invites";

    const userToInvite = (await knex(Model.user).select("*").where({ tag }))[0];

    if (!userToInvite) return "user to invite does not exist";
    if (saving.createdBy == userToInvite.id)
      return "you cannot invite yourself";

    // check if invite was previously sent
    const wasSent = (
      await knex(Model.invite)
        .select("*")
        .where({ to: userToInvite.id, status: "PENDING" })
    )[0];

    if (wasSent) return "invite was previously sent";
    // send invite
    const [id] = await knex(Model.invite).insert({
      from,
      to: userToInvite.id,
      status: "PENDING",
      saving_id: savingId,
    });

    const invite = await knex(Model.invite).select("*").where({ id });

    return invite[0];
  } catch (err) {
    Logger.error(err);
    return null;
  }
};

export const getAllUserInviteService = async (id: number) => {
  return await knex(Model.invite).select("*").where({ to: id });
};

export const updateInviteService = async (
  status: string,
  inviteID: number,
  userID: number
) => {
  try {
    const invite = (
      await knex(Model.invite).select("*").where({ id: inviteID })
    )[0];

    if (!invite) return "invalid invite id";
    if (invite.to !== userID) return "Forbidden";
    if (invite.status == "DECLINED")
      return "you've previously declined this invite";
    if (invite.status == "ACCEPTED")
      return "you've previously accepted this invite";

    await knex(Model.invite).where({ id: inviteID }).update({ status });

    return (await knex(Model.invite).select("*").where({ id: inviteID }))[0];
  } catch (error) {
    Logger.error(error);
    return null;
  }
};
