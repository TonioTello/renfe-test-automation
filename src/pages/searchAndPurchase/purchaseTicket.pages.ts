import BaseActions from "./baseActions"
import { SELECTOR } from "../../locatores/searchAndPurchase/locators.purchaseTicket"
import {expect, Page} from "@playwright/test"

export default class PurchaseTicket extends BaseActions {

    readonly page: Page;

    constructor(page: Page){
        super(page);
        this.page = page;
    }

    async gotoWebsite(baseUrl:string){
        await this.page.goto(baseUrl);
    }

    async acceptCookies(){
        const page = this.page;
        await page.getByRole('button', { name: 'Aceptar todas las cookies' }).click();
    }

    async searchAndSelectDestination(origin: string, destination: string) {
        const page = this.page;
        await page.getByPlaceholder('Selecciona tu origen').click();
        await page.getByPlaceholder('Selecciona tu origen').fill(origin);
        await page.getByPlaceholder('Selecciona tu origen').press('Enter');
        await page.getByRole('option', { name: 'VALENCIA JOAQUÍN SOROLLA' }).click();
        await page.getByPlaceholder('Selecciona tu destino').click();
        await page.getByPlaceholder('Selecciona tu destino').fill(destination);
        await page.getByPlaceholder('Selecciona tu destino').press('Enter');
        await page.getByRole('option', { name: 'BARCELONA-SANTS' }).click();
        await page.getByPlaceholder('Fecha ida').click();
        await page.getByText('Viaje solo ida').click();
        await page.getByText('30', { exact: true }).click({ timeout: 10000 });
        await page.waitForTimeout(1000);
        await page.keyboard.press('Control+Home');
        await page.getByRole('button', { name: 'Aceptar' }).click();
        await page.getByRole('button', { name: 'Buscar billete' }).click();
    }

    async selectTrainTicket() {
        const page = this.page;
        const ticketsAvailable =  await page.locator(SELECTOR.ticketsAvailable)
        await ticketsAvailable.nth(0).click()
        await page.locator(SELECTOR.basicTariffPlan).click();
        await page.getByRole('button', { name: 'Seleccionar' }).click();
        await page.getByText('No, quiero continuar con Bá').click();
    }


    async setPersonalInformation() {
        const page = this.page;
        await page.getByLabel('Nombre').click();
        await page.getByLabel('Nombre').fill('QA');
        await page.getByLabel('Primer apellido').click();
        await page.getByLabel('Primer apellido').fill('Automation');
        await page.getByLabel('Primer apellido').press('Tab');
        await page.getByLabel('Segundo apellido').click();
        await page.getByLabel('Segundo apellido').fill('Tester');
        await page.getByLabel('Selector de tipo de documento').selectOption('0022');
        await page.getByLabel('Número de documento', { exact: true }).click();
        await page.getByLabel('Número de documento', { exact: true }).fill('Z101010');
        await page.getByLabel('Correo electronico').click();
        await page.getByLabel('Correo electronico').fill('tester.QA@gmail.com');
        await page.getByLabel('Teléfono').click();
        await page.getByLabel('Teléfono').fill('674110110');
        await page.getByLabel('Teléfono').press('Enter');
        await expect(page.getByRole('button', { name: 'Viajero 1 Adulto check_circle' })).toBeVisible();
    }

    async skipPersonalizarViaje() {
        const page = this.page;
        await page.locator(SELECTOR.buttonPersonalizaViaje).click();
        await page.getByRole('button', { name: 'Continúa con la compra' }).click();
    }


    async setPaymentProcess() {
        const page = this.page;
        await page.getByPlaceholder('Correo electrónico').click();
        await page.getByPlaceholder('Correo electrónico').fill('tester.QA@gmail.com');
        await page.getByPlaceholder('Teléfono').click();
        await page.getByPlaceholder('Teléfono').fill('674110110');
        await page.locator('#datosPago_cdgoFormaPago_tarjetaRedSys').check();
        await page.locator('#aceptarCondiciones').check();
        await page.getByRole('button', { name: 'Finaliza tu compra' }).click();
    }

    async fillCreditCardInfo() {
        const page = this.page;
        await page.getByAltText('Nº de tarjeta').click();
        await page.getByAltText('Nº de tarjeta').fill('0000000000000000');
        await page.getByPlaceholder('mm').click();
        await page.getByPlaceholder('mm').fill('12');
        await page.getByPlaceholder('aa').click();
        await page.getByPlaceholder('aa').fill('30');
        await page.getByAltText('CVV').click();
        await page.getByAltText('CVV').fill('123');
        await page.getByAltText('Nº de tarjeta').click();
        await page.getByRole('button', { name: 'Pagar', exact: true }).click();
    }

    async validateMessage(errorMessage: string) {
        const page = this.page;
        await page.getByRole('button', { name: 'Pagar', exact: true }).click();
        await expect(page.getByText('Tarjeta no soportada (RS18)')).toBeVisible();
        await page.getByText('Tarjeta no soportada (RS18)').click();
        await expect(page.getByText('Tarjeta no soportada (RS18)')).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Se han encontrado los' })).toBeVisible();
        await page.getByLabel('cerrar', { exact: true }).click();
    }

}