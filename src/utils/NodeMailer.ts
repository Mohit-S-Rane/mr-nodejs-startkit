import * as nodeMailer from "nodemailer";
import * as SendGrid from "nodemailer-sendgrid-transport";

export class NodeMailer {
  private static initializeTransport() {
    return nodeMailer.createTransport(
      SendGrid({
        auth: {
          api_key: "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",
        },
      })
    );
  }

  static sendEmail(data: { to: [string]; subject: string; html: string }): Promise<any> {
    return NodeMailer.initializeTransport().sendMail({
      from: "support@mohitsrane.com",
      to: data.to,
      subject: data.subject,
      html: data.html,
    });
  }
}
