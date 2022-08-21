import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users_savings", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().unique().references("user.id");
    table.integer("saving_id").unsigned().unique().references("saving.id");
    table.timestamps(true, true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users_savings");
}
