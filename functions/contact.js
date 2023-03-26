require('dotenv').config()
const mailgun = require('mailgun-js')({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN })

exports.handler = (event, _context, callback) => {
  console.log({ event })

  const email = JSON.parse(event.body)

  const data = {
    from: `${email.name} <${email.email}>`,
    to: 'brendanlowsl@gmail.com',
    subject: `Email From ComeCommune: ${email.subject}`,
    text: `
          Sign Up for Newsletter?:\n
    ${email.newsletter ? 'Yes' : 'No'}\n\n
          Message: \n
    ${email.message}
    `
  }

  mailgun.messages().send(data, (error, body) => {
    console.log(body)

    callback(error, {
      statusCode: 200,
      body: JSON.stringify(body)
    })
  })
}
