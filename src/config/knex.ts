import * as Knex from 'knex'
import  database from "./config";

export const knexPool = Knex.knex(database.development)