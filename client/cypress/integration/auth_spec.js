/* eslint-disable no-undef */
describe('The Home Page', () => {
    it('successfully loads', () => {
        cy.visit('http://localhost:3000')
        cy.contains('Sign in').click()
        cy.contains('Login')

        cy.get('input[type="email"]')
            .type('test@test.com')
        cy.get('input[type="password"]')
            .type('test')

        cy.intercept('http://localhost:3001/auth/login').as('login')
        cy.intercept('http://localhost:3001/user/me').as('me')

        cy.contains('Submit').click()

        cy.wait('@login')
            .then(({_, response}) => {
                expect(response.statusCode).equal(200)
                expect(response.body).to.have.property('token')
                cy.wait('@me').then(() => {
                    cy.contains('test') // username
                })
            })
    })
})
