const Mailjet = require('node-mailjet');

const MJ_APIKEY_PUBLIC='your API key'
const MJ_APIKEY_PRIVATE='your API secret'

const MJ_API_TOKEN='your API token'

const mailjet = new Mailjet({
  apiKey: MJ_APIKEY_PUBLIC || 'your-api-key',
  apiSecret: MJ_APIKEY_PRIVATE || 'your-api-secret'
});

export const sendEmail = (
  fromEmail: string,
  fromName: string,
  toEmail: string,
  toName: string,
  subject: string,
  template: number,
  variables = {}
) => {
  return mailjet
        .post('send', { version: 'v3.1' })
        .request({
          Messages: [
            {
              From: {
                Email: fromEmail,
                Name: fromName
              },
              To: [
                {
                  Email: toEmail,
                  Name: toName
                }
              ],
              Subject: subject,
              Vars: variables,
              TemplateID: template
            }
          ]
        })
}

export const sendEmailRegister = (
  email: string,
  name: string,
  lang: string,
  token: string,
  userId: string|number
) => {
  return sendEmail(
    'ni-reply@test.com',
    'Test',
    email,
    name,
    "Validate your account",
    12346,
    {
      token: token,
      id: userId
    }
  )
}

export const sendEmailResetPassword = (
  email: string,
  name: string,
  lang: string,
  params: {
    token: string,
    userId: string|number,
  }
) => {
  return sendEmail(
    'ni-reply@test.com',
    'Test',
    email,
    name,
    "Validate your account",
    12346,
    params
  )
}

export const sendEmailInvitation = (
  email: string,
  name: string,
  lang: string,
  params: {
    token: string,
    userId: string|number,
    send: string,
    organization: string
  }
) => {
  return sendEmail(
    'ni-reply@test.com',
    'Test',
    email,
    name,
    "Validate your account",
    12346,
    params
  )
}

export const sendEmailChangeEmail = (
  email: string,
  name: string,
  lang: string,
  params: {
    token: string,
    userId: string|number,
  }
) => {
  return sendEmail(
    'ni-reply@test.com',
    'Test',
    email,
    name,
    "Validate your account",
    12346,
    params
  )
}

export const sendEmailPaymentFailed = (
  email: string,
  name: string,
  lang: string,
  params: {
    organization: string,
  }
) => {
  return sendEmail(
    'ni-reply@test.com',
    'Test',
    email,
    name,
    "Validate your account",
    12346,
    params
  )
}