import loginPage from "../../support/pageObjects/loginPage.js"
import loginData from "../../fixtures/loginData.json"

describe('Scenario Verifikasi Fungsi Login', () => {

  it('TC_001: Login with valid credentials', () => {
    loginPage.visitPage()
    loginPage.inputUsername(loginData.validUsername)
    loginPage.inputPassword(loginData.validPassword)
    loginPage.clickLoginBtn()
    loginPage.assertionLogin()
  })

  it('TC_002: Login with invalid credentials', () => {
    loginPage.visitPage()
    loginPage.inputUsername(loginData.invalidUsername)
    loginPage.inputPassword(loginData.invalidPassword)
    loginPage.clickLoginBtn()
    loginPage.assertionInvalid()
  })

  it('T_003: Login with all fields empty', () => {
    loginPage.visitPage()
    loginPage.clickLoginBtn()
    loginPage.assertionRequired()
  })

  it('TC_004: Login with empty username field', () => {
    loginPage.visitPage()
    loginPage.inputPassword(loginData.validPassword)
    loginPage.clickLoginBtn()
    loginPage.assertionRequired()
  })

  it('TC_005: Login with empty password field', () => {
    loginPage.visitPage()
    loginPage.inputUsername(loginData.validUsername)
    loginPage.clickLoginBtn()
    loginPage.assertionRequired()
  })

  it('TC_007: Password Masking', () => {
    loginPage.visitPage()
    loginPage.inputPassword(loginData.validPassword);
    loginPage.assertionMasking()
  })

  it('TC_008: Access Forgot Password page', () => {
    loginPage.visitPage()
    loginPage.clickForgotPass()
    loginPage.assertionForgotPage()
  })

})