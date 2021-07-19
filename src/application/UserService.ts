import RouterModules from './config/router/RouterModules';
import RouterProcessor from './config/webserver/RouterProcessor';
import app, { router } from './config/webserver/Server'
import ServiceErrorHandler from './web/error/ServiceErrorHandler';
import onError from './web/error/WebServerErrorHandler'
import RouterInterface from './web/router/RouterInterface';
import DatabaseConfig from './config/database/DatabaseConfig'

export default class UserService {
    private http = require('http');
    private database = new DatabaseConfig()

    constructor() {
        this.startDependencies()
        this.loadRoutes()
        this.startServer()
    }

    private startDependencies() {
        this.database.connect()
    }

    private loadRoutes() {
        const modules: RouterInterface[] =  RouterModules
        modules.forEach(module => {
            app.use(RouterProcessor(module.register(), router))
        })

        app.use(function (err: any, req: any, res: any, next: any) { ServiceErrorHandler(err, res) })
    }

    private startServer() {
        const server = this.http.createServer(app);
        server.listen(app.get('port'));
        server.on('error', onError);
        server.on('listening', () => {
            const addr = server.address();
            const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
            console.log('Listening on ' + bind);
        });
    }

    private shutDown(): void {
        this.database.disconnect()
        
    }
}


