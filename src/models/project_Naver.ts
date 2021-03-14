import { Model } from "objection";
import Project from "./projects";
import Naver from "./navers";

export default class Project_Naver extends Model {
    id!: number
    project_id?: number
    naver_id?: number

    static tableName = 'projects_navers';

    static relationMappings = () => ({
        projects: {
            relation: Model.BelongsToOneRelation,
            modelClass: Project,
            join: {
                from: 'projects_navers.projects_id',
                to: 'projects.id'
            },
        },

        navers: {
            relation: Model.BelongsToOneRelation,
            modelClass: Naver,
            join: {
                from: 'projects_navers.navers_id',
                to: 'navers.id'
            }
        }
    })

}