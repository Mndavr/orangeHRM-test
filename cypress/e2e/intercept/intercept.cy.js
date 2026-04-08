describe('Verify Login Function with Intercept', () => {
  const baseUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('TC_001: Login with valid credentials', () => {
    // Intercept 1
    cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('loginAuth');

    //Action
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    
    // Wait
    cy.wait('@loginAuth');

    //Assertion
    cy.url().should('include', '/dashboard/index');
  });

  it('TC_002: Login with invalid credentials', () => {
    // Intercept 2
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('getMessages');

    //Action
    cy.get('input[name="username"]').type('Adminn');
    cy.get('input[name="password"]').type('admin1234');
    cy.get('button[type="submit"]').click();

    // Wait 
    cy.wait('@getMessages');

    //Assertion
    cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials');
  });

  it('TC_006: Login with mixed case credentials', () => {
    // Intercept 3
    cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('failedLoginAttempt');

    //Action
    cy.get('input[name="username"]').type('adMIn');
    cy.get('input[name="password"]').type('aDmIN123');
    cy.get('button[type="submit"]').click();

    // Wait
    cy.wait('@failedLoginAttempt').then((interception) => {
      expect(interception.request.method).to.equal('POST');
    });

    //Assertion
    cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials');
  });

  it('TC_007: Password Masking', () => {
    // Intercept 4
    cy.intercept('GET', '**/web/images/ohrm_logo.png').as('logoLoad');

    //Action
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');

    // Wait
    cy.wait('@logoLoad');
  });

  it('TC_008: Access Forgot Password page', () => {
    // Intercept 5
    cy.intercept('GET', '**/auth/requestPasswordResetCode').as('forgotPasswordPage');

    //Action
    cy.get('.orangehrm-login-forgot-header').click();

    // Wait Intercept
    cy.wait('@forgotPasswordPage');

    //Assertion
    cy.url().should('include', '/requestPasswordResetCode');
    cy.get('.orangehrm-forgot-password-title').should('have.text', 'Reset Password');
  });
});