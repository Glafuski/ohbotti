const fs = require('fs');
// Web3JS for Ethereum
const web3 = require('web3');
// Discord.JS for possibility to host Discord bot
const Discord = require('discord.js');
const client = new Discord.Client(); 
const botmsg = require('./bot_actions');
const token = '';
const prefix = '!o'

client.on('message', async (msg) => {
    // Palauta tyhjää jos viesti ei ala prefixillä tai jos lähettäjänä on botti
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;
    // cdata = command data
    const cdata = {
        args: msg.content.slice(prefix.length).trim().split(/ +/),
        uid: msg.author.id
    };
    let response;
    let cexists = fs.existsSync('./commands/' + cdata.args[0] + '.js');
    if(cexists) {
        let command = require('./commands/' + cdata.args[0] + '.js');
        if(typeof command.init === 'undefined') {
            console.log('Command does not have init function.');
        }
        else {
            response = await command.init(cdata);
            if(response) {
                let hrObj = {
                    client: client,
                    response: response,
                    channelID: msg.author.lastMessageChannelID,
                    uid: msg.author.id
                };
                botmsg.handleResponse(hrObj);
            }
        }
    }
    else {
        console.log('Invalid command.');
    }
});
client.login(token);