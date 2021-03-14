import { Model } from "objection";
import Project_Naver from "./project_Naver";
import Project from "./projects";
export default class Naver extends Model {
    static tableName = "navers";

    id!: number
    name!: string
    job_role!: string
    birthdate!: string 
    admission_date!:  string

    created_at!: string
    updated_at!: string

    projects!: Project[]
    projects_navers!: Project_Naver[]




    // static jsonSchema = {
    //     type: 'object',
    //     required: ['name', 'job_role'],
    //     properties: {
    //         id:             {type: 'integer'},
    //         name:           {type: 'string', minLength: 1, maxLength: 50},
    //         job_role:       {type: 'string', minLength: 1, maxLength: 30},
    //         birthdate:      {type: 'string'},
    //         admission_date: {type: 'string'},
    //     },
    //     projects_navers: {
    //         id: { type: 'integer'}
    //     }
    // }

    static relationMappings = () => ({

        projects: {
            relation: Model.ManyToManyRelation,
            modelClass: Project,

            join: {
                from: "navers.id",
                through: {
                    from: "projects_navers.naver_id",
                    to: "projects_navers.project_id",
                },
                to: "projects.id",
            },
        },

    })

    async $alocate(){
        this.projects = await Project.query()
                .select('projects_navers.project_id')
                .join('projects_navers', 'projects_navers.project_id', 'projects.id')
                .where('projects_navers.naver_id', this.id);
    }

    $beforeUpdate() {
        this.updated_at = new Date().toISOString();
    }
}
