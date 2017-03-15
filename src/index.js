import path    from 'path'
import express from 'express'
import ejs     from 'ejs'
import Bot     from 'slackbots'

const createSlackEventAdapter = require('@slack/events-api').createSlackEventAdapter;
const slackEvents = createSlackEventAdapter('ojYIvoykr0dgV2UBtFemIyvZ');

let app = express();


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