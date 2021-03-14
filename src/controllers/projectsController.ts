import { Request, Response, Router } from "express";
import { Controller, Post, Get } from "@overnightjs/core";

import { ProjectService } from "../services/projects";

@Controller('api/projects')
export class ProjectController {

    @Get('')
    public async showProjects(req: Request, res: Response): Promise<Response> {
        try {
            const projects = await ProjectService.fetchNavers();
            return res.status(200)
            .json(projects);
        } catch (error) {
            console.log(error);
            return res.status(400)
            .json("Something went wrong");
        }
    }

    @Get(':id')
    public async showProjectDetails(req: Request, res: Response): Promise<Response> {
        var projectId = req.params.id;
        try {
            const projectById = await ProjectService.fetchNaverById(projectId);
            const projectDetails = await ProjectService.fetchDetailsByProject(projectId);
            return res.json({
                projectById,
                projectDetails
            })
        } catch (error) {
            return res.status(400).json(
                "Something went wrong"
            );
        }
    }


    @Post()
    public async addProject(req: Request, res: Response): Promise<Response> {
        const toAdd = req.body;
        var navId = toAdd['projects_navers']
        console.log(navId)

        try {
            const project = await ProjectService.addProjectAssociatedNaver(toAdd)
            const nav = await ProjectService.insertRelationship(project, navId)

            return res.status(200).json({
                project,
                nav
            })
        } catch (err) {
            console.log(err.data)
            return res.status(400).json()
        }

    }





}

