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
});

When('the user selects the destination {string} to {string}', async function (string, string2) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

When('the user enters personal information', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

When('the user proceeds to checkout', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

When('the user enters an invalid credit card information', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});


Then('the user should see an error message {string}', async function (string) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});
