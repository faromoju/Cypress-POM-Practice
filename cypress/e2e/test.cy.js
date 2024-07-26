/// <reference types="Cypress"/>

const { rahulObj } = require("./Pages/angularFile")

describe("General Tests", function() {
    beforeEach( function() {
        cy.visitPage()
    })
    it("Page Object Model", () => {
        cy.get(".container .jumbotron h1").invoke('text').then((text) => {
            cy.log(text)
        })
        rahulObj.enterName()
    })
    it("Shop", () => {
        rahulObj.shop()
    })
})