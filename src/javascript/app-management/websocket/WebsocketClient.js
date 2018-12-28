const uuid = require('uuid/v4');

class WebsocketClient {
    listeners = {};

    constructor(websocket) {
        this.websocket = websocket;

        this.attachListener();
    }

    addListener(listner) {
        const index = uuid();
        this.listeners[index] = listner;
    }

    removeListener(index) {
        this.listeners = this.listeners.filter((listener, i) => i !== index);
    }

    rootListener(message) {
        console.log(message);
    }

    attachListener() {
        this.websocket.addEventListener('message', (message) => this.rootListener(message));
    }
}

export default WebsocketClient;