import mqtt, { MqttClient } from "mqtt";
import { SocketService } from "./socketService";

let mqttService: MqttClient;

export const setupMQTT = () => {
    try {
        mqttService = mqtt.connect(process.env.MQTT_BROKER!, { username: 'chon', password: '1234', clientId: 'Web Server' });

    } catch (error) {
        console.log(error);
    }
    console.log('MQTT connected');

    subscribeTemperature();
    subscribeHumidity();
}

const subscribeTemperature = () => {

    mqttService.subscribe('+/temperature');
    mqttService.on('message', async (_t, _m) => {
        const topic = String(_t)
        const message = String(_m);

        if (topic.includes('temperature')) {
            SocketService.emit('temperature', { name: 'control', value: message });
        }


    })
}

const subscribeHumidity = () => {

    mqttService.subscribe('+/humidity');
    mqttService.on('message', async (_t, _m) => {
        const topic = String(_t)
        const message = String(_m);
        // console.log(topic, message);

        if (topic.includes('humidity')) {
             SocketService.emit('humidity', { name: 'control', value: message });
        }
    })
}

// import mqtt, { Client } from "mqtt"
// import SocketService from "./socketService";

// const AllTopic = {
//     root: 'hichon26909/#',
//     motion: 'hichon26909/motion/',
//     light_bathroom: 'hichon26909/light/bathroom'
// }

// class MqttService  {

//     public mqttClient: Client;
//     private topic = AllTopic;

//     constructor() {

//         // connect broker
//         this.mqttClient = mqtt.connect(String(process.env.MQTT_BROKER));
//         console.log('MQTT Client is running...');


//         // subscribe message
//         this.subscriber();
//     }

//     public subscriber() {

//         this.mqttClient.subscribe(this.topic.root);

//         this.mqttClient.on('message', (topic, _message) => {

//             const message = String(_message);

//             if (topic === this.topic.light_bathroom) {

//                 if (message === 'ON') {
//                     console.log('light bathroom : ON');
//                     SocketService.emit('light', { position: 'bathroom', massage: 'ON' });
//                 }
//                 else {
//                     console.log('light bathroom : OFF');
//                     SocketService.emit('light', { position: 'bathroom', massage: 'OFF' });
//                 }

//             }
//         })
//     }
// }

// export default MqttService;