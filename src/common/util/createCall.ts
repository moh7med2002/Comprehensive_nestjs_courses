import * as twilio from 'twilio';
const accountSid = 'AC39822cdee03a6fbe24036ec7e6ef79f3';
const authToken = '24345e1d7d6d0b734e93d94486192d77';
const client = twilio(accountSid, authToken);

export const createCall = (from, to) => {
  client.calls
    .create({
      url: 'http://demo.twilio.com/docs/voice.xml',
      to: to,
      from: from,
    })
    .then((call) => console.log(call.sid))
    .catch((err) => console.log(err));
};
