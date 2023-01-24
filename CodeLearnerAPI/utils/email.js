const nodemailer = require("nodemailer"),
  { google } = require("googleapis");

// initializung the google oauth2 configuration
const clientId = process.env.CLIENT_ID,
  clientSecret = process.env.CLIENT_SECRET,
  redirectUri = process.env.REDIRECT_URI,
  refreshToken = process.env.REFRESH_TOKEN;

// creatin oauth2 client
const oAuth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectUri
);

oAuth2Client.setCredentials({ refresh_token: refreshToken });

const sendMail = async (email, subject, html) => {
  try {
    const accessToken = await new Promise((resolve, reject) => {
      oAuth2Client.getAccessToken((err, token) => {
        if (err) {
          reject(`Failed to create access token : ${err}`);
        }
        resolve(token);
      });
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        accessToken,
        clientId,
        clientSecret,
        refreshToken,
      },
    });

    const mail = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      html,
    });
    return mail;
  } catch (error) {
    throw error;
  }
};

module.exports = sendMail;
