import { Request, Response, Router } from "express";
import { Controller, Post, Get } from "@overnightjs/core";

import { NaverService } from "../services/naver"
import Objection from "objection";

@Controller('api/navers')
export class NaversController {

    @Get('')
    public async showNavers(req: Request, res: Response): Promise<Response> {
        const allNavers = await NaverService.fetchNavers();
        return res.json(allNavers)
    }

    @Get(':id')
    public async showNaverDetails(req: Request, res: Response): Promise<Response> {
        var naverId = req.params.id;

        try {
            const naver = await NaverService.fetchNaverById(naverId);
            const naverDetails = await NaverService.fetchDetailsByNaver(naverId);
            return res.json({
                naver,
                naverDetails
            })
        } catch (error) {
            return res.status(400).json(
                "Something went wrong"
            );
        }
    }

    @Post()
    public async addNaver(req: Request, res: Response): Promise<Response> {
        const toAdd = req.body;
        var projectId = toAdd['projects_navers']

        try {
            const naver = await NaverService.addNaverAssociatedProject(toAdd)
            const proj = await NaverService.insertRelationship(naver, projectId)

            return res.status(200).json({
                naver,
                proj,
            })
        } catch (err) {
            console.log(err.data)
            return res.status(400).json()
        }

    }


}