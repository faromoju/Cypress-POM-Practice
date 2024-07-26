/// <reference types="Cypress"/>

export class rahulAngular {
    enterName () {
        cy.get('.form-group [name="name"]').type('Test')
    }

    shop () {
        cy.get('.navbar-nav .nav-link').eq(1).click()

        cy.get('app-card .card-body').find('.card-title a').each((productName, index) => {
            if(productName.text().includes("Samsung Note 8")) {
                cy.get('app-card .card-footer button').eq(index).click()
            }
        })
    }
}

export const rahulObj = new rahulAngular