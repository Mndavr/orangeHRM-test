describe('Verify Login Function', () => {
  const baseUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('TC_001: Login with valid credentials', () => {
    //Action
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    
    //Assertion
    cy.url().should('include', '/dashboard/index');
  });

  it('TC_002: Login with invalid credentials', () => {
    //Action
    cy.get('input[name="username"]').type('Adminn');
    cy.get('input[name="password"]').type('admin1234');
    cy.get('button[type="submit"]').click();

    //Assertion
    cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials'); //Pesan Invalid
  });

  it('TC_003: Login with all fields empty', () => {
    //Action
    cy.get('button[type="submit"]').click();

    //Assertion
    cy.get('.oxd-input-group__message').should('have.length', 2).and('contain', 'Required'); //Pesan Required
  });

  it('TC_004: Login with empty username field', () => {
    //Action
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    //Assertion
    cy.get('.oxd-input-group__message').should('be.visible').and('contain', 'Required'); //Pesan Required
  });

  it('TC_005: Login with empty password field', () => {
    //Action
    cy.get('input[name="username"]').type('Admin');
    cy.get('button[type="submit"]').click();

    //Assertion
    cy.get('.oxd-input-group__message').should('be.visible').and('contain', 'Required'); //Pesan Required
  });

  it('TC_006: Login with mixed case credentials', () => {
    //Action
    cy.get('input[name="username"]').type('adMIn');
    cy.get('input[name="password"]').type('aDmIN123');
    cy.get('button[type="submit"]').click();

    //Assertion
    cy.get('.oxd-alert-content-text').should('have.text', 'Invalid credentials'); //Pesan Invalid
  });

  it('TC_007: Password Masking', () => {
    //Action
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
  });

  it('TC_008: Access Forgot Password page', () => {
    //Action
    cy.get('.orangehrm-login-forgot-header').click();

    //Assertion
    cy.url().should('include', '/requestPasswordResetCode'); // Masuk halaman lain
    cy.get('.orangehrm-forgot-password-title').should('have.text', 'Reset Password'); // Ada tulisan Reset Password
    
  });
});