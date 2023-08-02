const nodemailer = require('nodemailer');

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  sendEmail(targetEmail, playlistName, content) {
    const message = {
      from: 'OpenMusic',
      to: targetEmail,
      subject: `Ekspor Playlist ${playlistName}`,
      text: 'Terlampir hasil dari ekspor playlist',
      attachments: [
        {
          filename: `${playlistName}.json`,
          content,
        },
      ],
    };

    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;