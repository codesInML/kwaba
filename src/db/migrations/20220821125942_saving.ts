import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("saving", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("numberOfBuddies").notNullable();
    table.integer("createdBy").notNullable();
    table.string("hasTarget").notNullable();
    table.string("savingType").notNullable();
    table.string("frequency").notNullable();
    table.string("amount").notNullable();
    table.string("duration").notNullable();
    table.string("startDate").notNullable();
    table.string("endDate").notNullable();
    table.string("relationship").notNullable();
    table.timestamps(true, true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("saving");
}
