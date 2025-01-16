import nodemailer from "nodemailer";

export class NotifyService {
  #transport = null;
  #instance = null;

  constructor() {
    if (this.#instance) return this.#instance;
    this.#transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    this.#instance = this;
    return this.#instance;
  }

  async notify(title, message) {
    this.#transport.sendMail({
      from: `"Pitstop service" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: title,
      text: message,
    });
  }
}
