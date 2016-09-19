const mailConfig = require('../../config/pushConfig').mailConfig

function mailSender (title, msg, html, receiver) {
    if (!receiver) return console.log('without receiver')

    const nodemailer = require('nodemailer')
    const smtpConfig = {
        host: 'smtp.163.com',
        port: 465,
        secure: true,
        auth: {
            user: mailConfig.user,
            pass: mailConfig.pass
        }
    }
    const transporter = nodemailer.createTransport(smtpConfig)

    var mailOptions = {
        from: '"Cov XSS" <' + mailConfig.user + '>',
        to: receiver,
        subject: title,
        text: msg,
        html: '<b>' + html + '</b>'
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            return console.log('Error at mailSender: ', error)
        }
        console.log('Mail sent: ' + info.response)
    })
}

module.exports.mailSender = mailSender

