import { Model } from "objection";
import Project_Naver from "./project_Naver";
import Naver from "./navers";

export default class Project extends Model {
    static tableName = "projects";
    id!: number
    name!: string
    created_at!: string
    updated_at!: string

    navers!: Naver[]
    projects_navers!: Project_Naver[]


    static relationMappings = () => ({
        navers: {
            relation: Model.ManyToManyRelation,
            modelClass: Naver,
            join: {
                from: 'projects.id',
                through: {
                    from: 'projects_navers.project_id',
                    to: 'projects_navers.naver_id',
                },
                to: 'naver.id',
            },
        },
    });



}