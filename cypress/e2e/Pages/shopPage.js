/// <reference types = "Cypress"/>

export class shopPage {
    clickShopButton() {
        return cy.get('a.nav-link').contains("Shop")
    }

    verifyRedirect() {
        return cy.get('h1.my-4').contains("Shop Name")
    }

    moveButtonRight() {
        return cy.get('.carousel-control-next span.carousel-control-next-icon')
    }

    moveBannerRight() {
        return cy.get('.carousel-indicators [data-slide-to="2"]')
    }

    selectProductNames() {
        return cy.get('.card-body .card-title a')
    }

    clickAddToCart() {
        return cy.get('.card-footer button')
    }

    clickCheckOutButton() {
        return cy.get('#navbarResponsive a.nav-link')
    }

    removeProductNames() {
        return cy.get('tr .media-body h4.media-heading a')
    }

    clickRemoveButton() {
        return cy.get('button.btn-danger')
    }

    selectProductCheckout() {
        return cy.get('tbody tr')
    }

    selectProductQuantityCheckout() {
        return cy.get('.form-control')
    }

    getProductAmountCheckout() {
        return cy.get('tbody tr')
    }

    getProductAmountCheckout1() {
        return cy.get('tr').eq(0).find('td').eq(3).find('strong')
    }

    getTotalProductAmountCheckout() {
        return cy.get('tr td h3 strong')
    }

    clickCheckout() {
        return cy.get('tbody button[class="btn btn-success"]')
    }

    selectCountryCheckout() {
        cy.get('div input#country').type("Bos")
        return cy.get('div.suggestions a', {timeout: 8000}).contains("Bosnia & Herzegovina")
    }

    getTermsandConditionsCheckbox() {
        return cy.get('div input[id="checkbox2"]')
    }

    getTermsandConditions() {
        return cy.get('div label[for="checkbox2"] a')
    }

    closeTermsandConditions() {
        return cy.get('div button[class="btn btn-info"]')
    }

    getPurchaseButton() {
        return cy.get('form input[value="Purchase"]')
    }

    getPurchaseForm() {
        return cy.get('form[novalidate][class="ng-untouched ng-pristine ng-valid"]')
    }

    getSuccessMessage() {
        return cy.get('div[class="alert alert-success alert-dismissible"]')
    }
}

export const shopPageObject = new shopPage