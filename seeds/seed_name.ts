import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("projects_navers").del();
    await knex("projects").del();
    await knex("navers").del();

    // Inserts seed entries
    await knex("projects").insert([
        { id: 1, name: "Dota2" },
        { id: 2, name: "WOW" },
        { id: 3, name: "FreeBSD" },
    ]);
    await knex("navers").insert([
        { id: 1, name: "Lucas", job_role: "C++ dev", birthdate: "1993-02-03", admission_date: "2021-10-03"},
        { id: 2, name: "Rafael", job_role: "DEVOPS", birthdate: "1993-02-03", admission_date: "2021-10-03"},
        { id: 3, name: "Jailton", job_role: "DEVOPS", birthdate: "1993-02-03", admission_date: "2021-10-03"},
        { id: 4, name: "Venefredo", job_role: "DEVOPS", birthdate: "1993-02-03", admission_date: "2021-10-03"},

    ]);
    await knex("projects_navers").insert([
        { id: 1, project_id: 3, naver_id: 1},
        { id: 2, project_id: 3, naver_id: 2},
        { id: 3, project_id: 3, naver_id: 3},
        { id: 4, project_id: 1, naver_id: 3},

    ])
};
