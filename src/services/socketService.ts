import socket, { Socket } from "socket.io";

let connection: any = null;

export class SocketService {

    sockets: any;

    constructor() {
        this.sockets = null;
    }
    connect(server: any) {
        const io = new socket.Server(server);
        this.sockets = io.of('/sensor').on("connection", (socket: Socket): void => {

            // this.socket = socket;

            const socketID = socket.id;

            console.log('client cennected ', socketID);

            socket.emit('socketID', socketID);

            socket.on('disconnect', (): void => {
                console.log('client disconnected');
                socket.disconnect();
            });

        });

        return io;
    }
    static emit(event: string, data: any) {
        if (connection.sockets) {
            return connection.sockets.emit(event, data);
        }

    }
    static on(event: string, listener: () => void) {
        if (connection.socket) {
            return connection.socket.on(event, listener);
        }
    }
    static init(server: any) {
        if (!connection) {
            connection = new SocketService();
            connection.connect(server);
        }
    }
    static getConnection() {
        if (connection) {
            return connection;
        }
        return
    }
}
export default {
    connect: SocketService.init,
    connection: SocketService.getConnection,
    emit: SocketService.emit,
    on: SocketService.on
}


// import socket from "socket.socket"

// var socketService:any;

// const setupSocket = (server: any) => {

//     socketService = new socket.Server(server);

//     console.log('Socket is running...');

//     socketService.of('/sensor').on("connectsocketn", (client:any) => {

//             console.log('client cennected ', client.id);

//             client.emit('socketID',client.id);

//             socketService.emit('light', 'test');

//             client.on('disconnect', functsocketn () {
//                 console.log('client disconnected');
//                 client.disconnect();
//             });
//     });
// }

// export const emit = (emit: string, data: {} | []) => {
//     console.log(emit);
//     console.log(data);
//     socketService.emit(emit, 'test');
// }

// export const on = (ev: string, callback: () => void) => {
//     socketService.emit(ev, callback);
// }

// export default {
//     setupSocket,
//     emit,
//     on
// }

// import socketIO from "socket.io";
// import { DefaultEventsMap } from "socket.io/dist/typed-events";

// export default class SocketService {

//     public socket: socketIO.Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
//     private clientID: string | undefined;

//     constructor(server?: any) {

//         this.socket = new socketIO.Server(server);
//         console.log('socket server is running');

//         this.socket.of('/sensor').on("connection", (client: any) => {

//             console.log('client cennected ', client.id);

//             this.clientID = client.id;
//             this.socket = client;

//             client.on('disconnect', () => {
//                 console.log('client disconnected');
//                 client.disconnect();
//             });

//         });

//         setInterval(() => {
//             this.socket.emit('socketID', this.clientID);
//             this.socket.emit('light', new Date());
//         }, 2000);
//     }

//     // setUpSocket(server: any) {


//     // }

// }