import express, { Application } from 'express';
import http, { Server } from 'http';
import dotenv from 'dotenv';
import * as mqttService from './services/mqttService';
import socketService from './services/socketService';
dotenv.config();

declare const process: {
    env: {
        PORT: number;
        MQTT_BROKER: string;
        MQTT_PORT: number;
    }
}

const PORT: number = process.env.PORT;

const app: Application = express();

const server: Server = http.createServer(app);

server.listen(PORT, () => {
    console.log('server is running port ', PORT);
});

mqttService.setupMQTT();
socketService.connect(server);
