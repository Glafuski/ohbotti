const msglist = require('./messages.json');
class BotActions {
    handleResponse(hrObj) {
        this.hrObj = hrObj;
        this.client = hrObj.client;
        this.channelID = hrObj.channelID;
        switch(hrObj.response.type) {
            case 'sendmessage':
                this.sendMessage(hrObj.response);
            break;
            case 'custommessage':
                this.customMessage(hrObj.response);
            break;
            case 'play': 
                this.play(hrObj.response);
            break;
        }
    }
    sendMessage(response) {
        let msg;
        for(var key in msglist) {
            if(response.message === key) {
                msg = msglist[key];
            }
        }
        if(!msg) {
            msg = 'No message set. Someone (definetly not the developer) forgot to add message to this action.';
        }
        const channel = this.client.channels.cache.get(this.channelID);
        channel.send(msg);
    }
    customMessage(response) {
        const channel = this.client.channels.cache.get(this.channelID);
        channel.send(response.message);
    }
    play(response) {
        switch(response.message) {
            case 'coinflip':
                require('./games/coinflip').init(this.hrObj);
            break;
            case 'dice':
                require('./games/dice').init(this.hrObj);
            break;
            default:
                this.client.channels.cache.get(this.channelID).send('Invalid game');
            break;
        }
    }
}
module.exports = new BotActions;