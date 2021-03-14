import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('projects', (table: Knex.TableBuilder) => {
        table.increments('id').primary()
        table.string('name')
        table.timestamp('created_at')
        table.timestamp('updated_at')})
        .createTable('navers', (table: Knex.TableBuilder) => {
            table.increments('id')
            table.string('name')
            table.string('job_role')
            table.date('birthdate')
            table.date('admission_date')
            table.date('created_at')
            table.date('updated_at')
        })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema
    .dropTableIfExists('projects')
    .dropTableIfExists('books')
}

