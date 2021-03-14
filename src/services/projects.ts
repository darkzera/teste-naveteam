import Project from "../models/projects";
import Project_Naver from "../models/project_Naver";
import Naver from "../models/navers";

class projectServer {
    constructor() { }

    async fetchNavers(): Promise<Project[]> {
        return await Project.query().select("*");
    }


    async addProjectAssociatedNaver(project: Project): Promise<Project> {
        delete project.projects_navers;
        try {
            const projectAdded = await Project.query().insert(project);
            return projectAdded;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async insertRelationship(project: Project, navArr: any): Promise<Naver|any> {

        var navFoundId; 
        for (let a of navArr) { 
            navFoundId = await this.verifyNavExist(a);
            if (navFoundId){
                await Project_Naver.query().insert({
                    project_id: project.id,
                    naver_id: navFoundId.id
                })
            }
            else {
                console.log('Naver ID not found')
            }
        }
        return navArr;
    }

    private async verifyNavExist(id: number): Promise<Naver> {
        const nv = await Naver.query().findById(id);
        return nv;

    }

    async fetchNaverById(naverId: string): Promise<Project> {
        return Project.query().findById(naverId);
    }

    async fetchDetailsByProject(project: string): Promise<string | Project_Naver[]> {
        var projects;
        projects = await Project_Naver.query()
            .select('navers.id', 'navers.name as Project member:')
            .join('navers', 'projects_navers.naver_id', 'navers.id')
            .where('projects_navers.project_id', project);
        return projects;
    }




}
export const ProjectService = new projectServer(); 