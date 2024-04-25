import {Given, When, Then, Before, After} from "@cucumber/cucumber";
import PurchaseTicket from "../../pages/searchAndPurchase/purchaseTicket.pages";

const {chromium} = require("playwright"); // Or 'chromium' or 'firefox'.

let { setDefaultTimeout } = require("@cucumber/cucumber");
setDefaultTimeout(60 * 1000);

Before(async function () {
    this.browser = await chromium.launch({ headless: false });
    const context = await this.browser.newContext();
    this.page = await context.newPage();
});

After(async function () {
    await this.page?.close();
    await this.context?.close();
    await this.browser.close();
});

Given('the user is on the Renfe website', async function () {
    const page = this.page;
    const baseUrl = "https://www.renfe.com/es/es";
    const purchaseTicket = new PurchaseTicket(page)
    await purchaseTicket.gotoWebsite(baseUrl);
    await purchaseTicket.acceptCookies();
});

When('the user selects the destination {string} to {string}', async function (origin: string, destination: string) {
    const page = this.page;
    const purchaseTicket = new PurchaseTicket(page)
    await purchaseTicket.searchAndSelectDestination(origin, destination);
    await purchaseTicket.selectTrainTicket();

});

When('the user enters personal information', async function () {
    const page = this.page;
    const purchaseTicket = new PurchaseTicket(page)
    await purchaseTicket.setPersonalInformation();
    await purchaseTicket.skipPersonalizarViaje();

});

When('the user proceeds to checkout', async function () {
    const page = this.page;
    const purchaseTicket = new PurchaseTicket(page)
    await purchaseTicket.setPaymentProcess();
    await purchaseTicket.fillCreditCardInfo();
});

When('the user enters an invalid credit card information', async function () {
    const page = this.page;
    const purchaseTicket = new PurchaseTicket(page)
    await purchaseTicket.fillCreditCardInfo();
});


Then('the user should see an error message {string}', async function (errorMessage: string) {
    const page = this.page;
    const purchaseTicket = new PurchaseTicket(page)
    await purchaseTicket.validateMessage(errorMessage);
});
