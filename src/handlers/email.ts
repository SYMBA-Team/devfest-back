import nodemailer from "nodemailer";
import logger from "../models/logger";
import { google } from "googleapis";
import { readFileSync } from "fs";
if (
    !process.env.BACK_GMAIL_MAIL ||
    !process.env.BACK_GMAIL_CLIENT_ID ||
    !process.env.BACK_GMAIL_CLIENT_SECRET ||
    !process.env.BACK_GMAIL_REFRESH_TOKEN ||
    !process.env.APP_Name
)
    throw new Error("Email configuration is not defined");
const emailTemplate = readFileSync("./emailTemplate.html").toString();
console.log(emailTemplate);
const OAuth2 = google.auth.OAuth2;

const OAuth2_client = new OAuth2(process.env.BACK_GMAIL_CLIENT_ID, process.env.BACK_GMAIL_CLIENT_SECRET);
OAuth2_client.setCredentials({ refresh_token: process.env.BACK_GMAIL_REFRESH_TOKEN });

// sending email function :
const sendEmail = async (name: string, subject: string, recipient: string) => {
    const accessToken = OAuth2_client.getAccessToken();
    const transport = nodemailer.createTransport({
        // @ts-ignore
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: process.env.USER,
            clientId: process.env.BACK_GMAIL_CLIENT_ID,
            clientSecret: process.env.BACK_GMAIL_CLIENT_SECRET,
            refreshToken: process.env.BACK_GMAIL_REFRESH_TOKEN,
            accessToken: accessToken,
        },
    });

    const mail_options = {
        from: `"${process.env.APP_Name}" <${process.env.BACK_GMAIL_MAIL}>`,
        to: recipient,
        subject,
        html: templateHtml(name),
    };
    await transport
        .sendMail(mail_options)
        .then((data) => {
            logger.log("Email has been sent", data);
        })
        .catch((e) => {
            logger.error("Couldn't send email", e.message);
        });
};

//function that return an html template for the email :
const templateHtml = (name: string) => {
    return emailTemplate.replace("##UserName##", name);
};
