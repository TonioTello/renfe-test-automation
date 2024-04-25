import BaseActions from "./baseActions"
import { SELECTOR } from "../../locatores/searchAndPurchase/locators.purchaseTicket"
import { Page } from "@playwright/test"

export default class PurchaseTicket extends BaseActions {
    readonly page: Page;

    constructor(page: Page){
        super(page);
        this.page = page;
    }

    async gotoWebsite(baseUrl:string){
        await this.page.goto(baseUrl);
    }

}