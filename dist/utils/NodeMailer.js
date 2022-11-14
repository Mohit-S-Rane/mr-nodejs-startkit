"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeMailer = void 0;
const nodeMailer = require("nodemailer");
const SendGrid = require("nodemailer-sendgrid-transport");
class NodeMailer {
    static initializeTransport() {
        return nodeMailer.createTransport(SendGrid({
            auth: {
                api_key: "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",
            },
        }));
    }
    static sendEmail(data) {
        return NodeMailer.initializeTransport().sendMail({
            from: "support@mohitsrane.com",
            to: data.to,
            subject: data.subject,
            html: data.html,
        });
    }
}
exports.NodeMailer = NodeMailer;
