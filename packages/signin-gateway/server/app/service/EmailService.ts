import { Service } from "egg";
import nodemailer from "nodemailer";
import { username, password } from "config-storage/163";

const transport = nodemailer.createTransport({
  pool: true,
  host: "smtp.163.com",
  secure: false,
  auth: { user: username, pass: password },
});

transport.verify().then(() => console.log("verified"));

export default class EmailService extends Service {
  public async sendEmail() {}
}
