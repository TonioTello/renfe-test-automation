import { Page } from "@playwright/test";

export default class BaseActions {
    readonly page;

    constructor(page:Page){
        this.page = page;
    }

    async clickElement(selector:string){
        const page = this.page;
        await this.page.locator(selector).waitFor();
        await this.page.locator(selector).click();
      }
    
}