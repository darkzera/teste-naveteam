import './util/module-alias'
import { Server } from '@overnightjs/core'
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import { Model } from "objection";

// import knexConfig from './database';
import knexConfig from "../knexfile"
import Knex, { knex } from 'knex';
import { Application } from 'express';

import { ProjectController } from './controllers/projectsController'
import { NaversController } from './controllers/naversController';
import { knexPool } from './config/knex';



export class SetupServer extends Server {

    public knex = Knex(knexConfig.development);
    constructor() {
        super(process.env.NODE_ENV === 'development');
    }

    public init(): void {
        // Model.knex();
        this.setupExpress();
        this.setupControllers();
        this.knexSetup();
        this.start();
    }

    public getApp(): Application {
        return this.app;
    }

    private setupExpress(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(morgan('dev'));
        this.app.use(cors());
    }

    private setupControllers(): void {
        const projectController = new ProjectController();
        const naversController = new NaversController();
        this.addControllers([
            projectController,
            naversController
        ])
    }

    private async knexSetup(): Promise<void> {
        Model.knex(knex)
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Servidor conectado na porta', this.app.get('port'))
        });

    }


}
