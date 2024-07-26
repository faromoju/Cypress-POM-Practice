/// <reference types = "Cypress"/>

export class homePage {
    inputName() {
        return cy.get('input.form-control[name="name"]')
    }

    inputErrorMessage() {
        return cy.get('div.alert-danger')
    }

    inputEmail() {
        return cy.get('input.form-control[name="email"]')
    }

    inputPassword() {
        return cy.get('input.form-control[placeholder="Password"]')
    }

    checkIceCream() {
        return cy.get('input#exampleCheck1')
    }

    selectGender() {
        return cy.get('select#exampleFormControlSelect1')
    }

    employmentName() {
        return cy.get('.form-group label.form-check-label')
    }

    selectEmployment() {
        return cy.get('.form-group input.form-check-input')
    }

    selectDate() {
        return cy.get('.form-group input.form-control[name="bday"]')
    }

    checkName() {
        return cy.get('h4 input[name="name"]')
    }

    clickSubmit() {
        return cy.get('input.btn[type="submit"]')
    }

    successMessage() {
        return cy.get('div.alert-success')
    }
}

export const homePageObject = new homePage