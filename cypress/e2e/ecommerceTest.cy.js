/// <reference types = "Cypress"/>

const { homePageObject } = require("./Pages/homePage")
const { shopPageObject } = require("./Pages/shopPage")

describe("Complete Test", function () {
    before("Before Instructions", () => {
        cy.fixture("homePage").then((data) => {
            this.data1 = data
        })

        cy.fixture("shopPage").then((data) => {
            this.data = data
        })
    })
    it("Home Page", () => {
        cy.visitSite()
        //Type Name and Verify Error Message
        homePageObject.inputName().type(this.data1.name)
        homePageObject.inputName().clear()
        homePageObject.inputEmail().click()
        homePageObject.inputErrorMessage().then((errorMessage) => {
            if (errorMessage.text().includes("Name")) {
                homePageObject.inputErrorMessage().should("be.visible")
            }
        })
        homePageObject.inputName().type(this.data1.name)

        //Type Email and Verify Error Message
        homePageObject.inputEmail().type(this.data1.email)
        homePageObject.inputEmail().clear()
        homePageObject.inputName().click()
        homePageObject.inputErrorMessage().then((errorMessage) => {
            if (errorMessage.text().includes("Email")) {
                homePageObject.inputErrorMessage().should("be.visible")
            }
        })
        homePageObject.inputEmail().type(this.data1.email)

        //Rest of Inputs
        homePageObject.inputPassword().type(this.data1.password)
        homePageObject.checkIceCream().check()
        homePageObject.selectGender().select(this.data1.gender)

        //Employment Status
        homePageObject.employmentName().each((employStatus, index) => {
            if (employStatus.text().includes(this.data1.employmentStatus)) {
                homePageObject.selectEmployment().eq(index).click()
            }

            if (employStatus.text().includes("Entrepreneur")) {
                homePageObject.selectEmployment().eq(index).should("be.disabled")
            }
        })

        //Date of Birth
        homePageObject.selectDate().click().type(this.data1.dateOfBirth)
        homePageObject.selectDate().should('contain.value', this.data1.dateOfBirth)

        //Verify Name
        homePageObject.checkName().should('contain.value', this.data1.name)

        //Click Submit
        homePageObject.clickSubmit().click()

        //Check if Submit was successful
        homePageObject.successMessage().should('be.visible')
    })

    it("Store Page", () => {
        cy.visitSite()

        //Go to Shop Page
        shopPageObject.clickShopButton().click()
        shopPageObject.verifyRedirect().should('be.visible')

        //Banner Movements
        shopPageObject.moveButtonRight().click()
        shopPageObject.moveBannerRight().click()

        //Add Items to Cart
        this.data.productName.forEach(individualProductName => {
            shopPageObject.selectProductNames().each((product, index) => {
                if (product.text().includes(individualProductName)) {
                    shopPageObject.clickAddToCart().eq(index).click()
                }
            })
        });

        //Click Checkout Button
        shopPageObject.clickCheckOutButton().click()

        //Click Remove Button
        shopPageObject.removeProductNames().each((product, index) => {
            if (product.text().includes(this.data.removeProductName)) {
                shopPageObject.clickRemoveButton().eq(index).click()
            }
        })

        //Reduce Quantity of items in Checkout
        let amountProduct1 = 0
        let amountProduct2 = 0
        let totalAmount = 0
        shopPageObject.selectProductCheckout().each((product, index) => {
            if (product.text().includes(this.data.removeQuantityProductName)) {
                shopPageObject.selectProductQuantityCheckout().eq(index).clear()
                shopPageObject.selectProductQuantityCheckout().eq(index).type("2")
                //Get Product Amount
                shopPageObject.getProductAmountCheckout().eq(index).find('td').eq(3).find('strong').invoke('text').then((productAmount) => {
                    amountProduct1 = Number(productAmount.split(" ")[1].trim())
                })
            }
        })

        //Add Quantity to items in Checkout
        shopPageObject.selectProductCheckout().each((product, index) => {
            if (product.text().includes(this.data.addQuantityProductName)) {
                shopPageObject.selectProductQuantityCheckout().eq(index).clear()
                shopPageObject.selectProductQuantityCheckout().eq(index).type("2")
                //Get Product Amount
                shopPageObject.getProductAmountCheckout().eq(index).find('td').eq(3).find('strong').invoke('text').then((productAmount) => {
                    amountProduct2 = Number(productAmount.split(" ")[1].trim())
                })
            }
        }).then(() => {
            //Sum of Product Amounts and Validate then Click Checkout
            totalAmount = amountProduct1 + amountProduct2
            shopPageObject.getTotalProductAmountCheckout().should('contain', totalAmount)
            shopPageObject.clickCheckout().click()

            //Select Country in Checkout and Click Terms and Conditions
            shopPageObject.selectCountryCheckout().click()

            shopPageObject.getTermsandConditionsCheckbox().should('not.be.checked')

            shopPageObject.getTermsandConditions().click()
            shopPageObject.closeTermsandConditions().click()
            shopPageObject.getTermsandConditionsCheckbox().should('be.checked')

            //Click Purchase
            shopPageObject.getPurchaseButton().click()
            //shopPageObject.getPurchaseForm().submit()

            //Validate Success Message
            shopPageObject.getSuccessMessage().should('contain.text', "Success")
            // shopPageObject.getSuccessMessage().invoke('text').then((text) => {
            //     cy.wrap(text).should('contain', "Success")
            // })
        })
    })
})