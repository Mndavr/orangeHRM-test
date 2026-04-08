class loginPage {
  visitPage() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }
  
  inputUsername(username) {
    cy.get('input[name="username"]').type(username);
  }

  inputPassword(password) {
    cy.get('input[name="password"]').type(password);
  }

  clickLoginBtn() {
    cy.get('button[type="submit"]').should('be.visible').click();
  }

  assertionLogin() {
    cy.url().should('include', '/dashboard/index');
  }

  assertionInvalid() {
    cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials');
  }

  assertionRequired() {
    cy.get('.oxd-input-group__message').should('be.visible').and('contain', 'Required');
  }

  clickForgotPass() {
    cy.get('.orangehrm-login-forgot-header').click();
  }

  assertionMasking() {
    cy.get('input[name="password"]').should('be.visible').and('have.attr', 'type', 'password');
  }

  assertionForgotPage() {
    cy.url().should('include', '/requestPasswordResetCode');
    cy.get('.orangehrm-forgot-password-title').should('be.visible').and('have.text', 'Reset Password');
  }
}

export default new loginPage();