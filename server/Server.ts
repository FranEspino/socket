import express,{Application} from 'express';
import cors from 'cors';

import path from "path";
const locationDriver = require('../socket/location_driver');

class Server {
    private app: Application;
    private server:  any;
    private io: any;
    private port: string;
    private apiPaths = {
       
    };
    middleware() {
        this.app.use(cors({origin: '*'}));
        this.app.use(express.json())
        this.app.use(express.static(path.join(__dirname, "../public")));
        this.app.use(express.static("public"));
    }

    socket() {
        locationDriver(this.io);
        this.io.on('connection', (socket: any) => {
            locationDriver(socket);
        });
    
    }
    constructor(){
        this.app = express();
        this.port = process.env.PORT || '9000';
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);
        this.middleware();
        this.socket();

    }

  



    listen(){
        this.server.listen(this.port, () => {
            console.log('✓ The server Vespro api is runing in port: '+this.port);
        })
    
    }
}
export default Server;