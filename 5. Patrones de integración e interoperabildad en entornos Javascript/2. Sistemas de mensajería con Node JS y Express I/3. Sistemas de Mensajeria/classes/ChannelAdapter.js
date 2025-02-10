module.exports = class ChannelAdapter {
    constructor(channelType) {
        this.channelType = channelType;
    }

    sendMessage(message) {
        console.log(`Enviando mensaje a través de ${this.channelType}`);
    }

    receiveMessage() {
        console.log(`Recibiendo mensaje de ${this.channelType}`);
    }
};
