import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("invite", (table) => {
    table.increments("id").primary();
    table.integer("from").notNullable();
    table.integer("to").notNullable();
    table.string("status").notNullable();
    table.integer("saving_id").unsigned().references("saving.id");
    table.timestamps(true, true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("invite");
}
