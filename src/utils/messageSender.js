import twilio from "twilio";
import Config from "../config.js";

export default class MessageSender {

  static async sendMessage(number, products) {
    const client = twilio(Config.ACCOUNT_SID, Config.AUTH_TOKEN);

    const options = {
      body: `Purchase made successfully ${ products }`,
      from: '+19289165537',
      to: number,
    };
    try {
      const message = await client.messages.create(options);
      console.log(message);
    } catch (err) {
      console.log({
        message: err.message,
      });
    }
  }
}