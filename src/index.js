import path    from 'path'
import express from 'express'
import ejs     from 'ejs'
import Bot     from 'slackbots'

const createSlackEventAdapter = require('@slack/events-api').createSlackEventAdapter;
const slackEvents = createSlackEventAdapter('ojYIvoykr0dgV2UBtFemIyvZ');

let app = express();

// create a bot 
var bot = new Bot({
    token: 'xoxb-154489336386-phY8U8izk5hiRkqeVRSKIkW0',
    name: 'My Bot'
});

bot.on('start', () => {
		console.log('started')
    // more information about additional params https://api.slack.com/methods/chat.postMessage 
    var params = {
        icon_emoji: ':cat:'
    };
    
    // define channel, where bot exist. You can adjust it there https://my.slack.com/services  
    bot.postMessageToChannel('general', 'meow!', params);

		bot.on('message', (data) => {
			console.log('mess come ===================')
			console.log(data)
		}) 
});

app.use('/slack/events', slackEvents.expressMiddleware());

// Attach listeners to events by Slack Event "type". See: https://api.slack.com/events/message.im
slackEvents.on('message', (event)=> {
	console.log('Event from message.im')
  console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
});

// Handle errors (see `errorCodes` export)
slackEvents.on('error', console.error);


app
.engine('html', require('ejs').renderFile)
.set('view engine', 'html')
.set('views', path.join(__dirname, 'public'))

module.exports = () => {
	app.listen(3000, () => {
    console.log('Server started at %s', 3000);
  })

  return app;
}