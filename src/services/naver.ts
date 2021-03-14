import Project from "../models/projects";
import Project_Naver from "../models/project_Naver";
import Naver from "../models/navers";

class naverService {
    constructor(){}

    async fetchNavers(): Promise<Naver[]> {
        const navers = await Naver.query().select("*");
        return navers;
    }


    async addNaverAssociatedProject(naver: Naver): Promise<Naver> {
        delete naver.projects_navers;
        try {
            const naverAdded = await Naver.query().insert(naver);
            return naverAdded;
        } catch (error) {
            return error;
        }
    }


    async insertRelationship(naver: Naver, projArrId: any): Promise<Project|any> {
        for (let proj of projArrId) {
            var projFoundId = await this.verifyProjExist(proj);
            if (!projFoundId) {
                console.log("Project ID{" + proj + "} doesnt exist")
            } else {
                await Naver.relatedQuery('projects')
                    .for(naver.id)
                    .relate(proj);
            }
        }
        return projArrId;
    }

    async fetchNaverById(naverId: string): Promise<Naver> {
        return Naver.query().findById(naverId);

    }

    async fetchDetailsByNaver(naverId: string): Promise<string | Project_Naver[]>{
        var projects;
        projects = await Project_Naver.query()
            .select('projects.id', 'projects.name as Project name:')
            .join('projects', 'projects_navers.project_id', 'projects.id')
            .where('projects_navers.naver_id', naverId);
        if (projects.length === 0) projects = `No projects`;

        return projects;
    }

    private async verifyProjExist(id: number): Promise<Project> {
        const projectExist = await Project.query().findById(id);
        return projectExist;

    }


}
export const NaverService = new naverService();
