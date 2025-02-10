const ChannelAdapter = require("./ChannelAdapter");

module.exports = class HttpChannelAdapter extends ChannelAdapter {
    constructor() {
        super("HTTP");
    }

    sendMessage(message) {
        super.sendMessage(message);
        console.log("Mensaje enviado a través de HTTP");
    }

    receiveMessage(req) {
        super.receiveMessage();
        return req.body;
    }
}
