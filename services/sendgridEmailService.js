const sgMail = require("@sendgrid/mail")
const NEW_SIGNIN_URL = process.env.NEW_SIGNIN_URL
const RESET_PASSWORD = process.env.RESET_PASSWORD
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.sendUserRegistrationMail = async (emailId, username, tempPassword) => {
  // console.log(`sending user registration email to user: ${username}`)
  const pwdResetLink = `${NEW_SIGNIN_URL}?name=${username}&pass=${tempPassword}`
  // console.log(`pwdResetLink: ${pwdResetLink}`)
  const msg = {
    to: emailId, // Change to your recipient
    from: "hr@sukalpatechsolutions.com", // Change to your verified sender
    subject: "user registration confirmation",
    text: "reset password and login",
    html: `click <a href="${pwdResetLink}">here</a> to reset password and login`,
  }
  sgMail
    .send(msg)
    .then(() => {
      // console.log(`user registration mail email sent to user: ${emailId}`)
      return true
    })
    .catch((error) => {
      console.error(error)
      return false
    })
}

exports.sendForgotPasswordMail = async (emailId, username, tempPassword) => {
  // console.log(`sending new password email to user: ${username}`)
  const forgotPwdLink = `${RESET_PASSWORD}?name=${username}&pass=${tempPassword}`
  // console.log(`forgotPwdLink: ${forgotPwdLink}`)
  const msg = {
    to: emailId, // Change to your recipient
    from: "hr@sukalpatechsolutions.com", // Change to your verified sender
    subject: "Your new password to login",
    text: "Here is your new password to Login. Also, you can use the below link to login back to the site.",
    html: `click <a href="${forgotPwdLink}">here</a> to reset password and login`,
  }
  sgMail
    .send(msg)
    .then(() => {
      // console.log(`Forgot password email sent to user: ${emailId}`)
      return true
    })
    .catch((error) => {
      console.error(error)
      return false
    })
}
