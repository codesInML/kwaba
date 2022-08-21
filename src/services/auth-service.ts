import knex from "../db";
import { Model, Password } from "../helpers";

export const createUserService = async (data: {
  fullName: string;
  tag: string;
  email: string;
  password: string;
}) => {
  try {
    const password = await Password.toHash(data.password);
    const [id] = await knex(Model.user).insert({
      ...data,
      password,
    });

    return { id, fullName: data.fullName, tag: data.tag, email: data.email };
  } catch (error) {
    return null;
  }
};

export const findUser = async (email: string) => {
  const user = await knex(Model.user).select("*").where({ email });
  return user;
};
