import './util/module-alias'
import { Server } from '@overnightjs/core'
import bodyParser from 'body-parser';
import * as Knex from 'knex'

import { ProjectController } from './controllers/projectsController'

export class SetupServer extends Server {

    constructor(private port = 3000) {
        super();
    }

    public initExpress(): void {
        this.setupExpress();
        console.log('Servidor conectado na porta', this.port);
    }

    private setupExpress(): void {
        this.app.use(bodyParser.json());
    }
    
    private setupController(): void {
        const projectController = new ProjectController();
    }
    

}
const server =  new SetupServer();
server.initExpress();

