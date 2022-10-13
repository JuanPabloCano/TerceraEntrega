import { createTransport } from 'nodemailer';
import Config from "../config.js";

export default class EmailSender {

  static #SUBJECT;
  static #MESSAGE;

  constructor() {
    this.#SUBJECT = 'Purchase made';
    this.#MESSAGE = 'Congratulations, you hava successfully completed your purchase';
  }

  static async sendEmail(receiver, products) {
    const transport = createTransport({
      service: 'gmail',
      port: 587,
      auth: {
        user: Config.TEST_EMAIL,
        password: Config.PASSWORD
      }
    });
    const mailOptions = {
      from: 'Server Node.Js',
      to: receiver,
      subject: this.#SUBJECT,
      message: `${ this.#MESSAGE } with items ${ products }`
    };

    try {
      const info = await transport.sendEmail(mailOptions);
      console.log(info);
    } catch (err) {
      console.log({
        message: err.message
      });
    }
  }
}