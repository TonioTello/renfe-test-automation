import BaseActions from "./baseActions"
import { SELECTOR } from "../../locatores/searchAndPurchase/locators.purchaseTicket"
import {expect, Page} from "@playwright/test"
import passengerInfo from "../../data-driver/passengerInfo.json"
import CommonMethods from "../../utils/commonMethods";

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
        await page.getByRole('button', { name: 'Aceptar todas las cookies' }).click({timeout: 30000});
    }

    async searchAndSelectDestination(origin: string, destination: string) {
        const page = this.page;

        await page.locator(SELECTOR.inputOrigin).fill(origin);
        const originResult =  page.locator(SELECTOR.originSearchResults).nth(0);
        await originResult.click()
        await page.getByPlaceholder('Selecciona tu destino').click();
        await page.locator(SELECTOR.inputDestination).fill(destination);
        const destinationResult =  page.locator(SELECTOR.destinationSearchResults).nth(0);
        await destinationResult.click()
        await page.getByPlaceholder('Fecha ida').click();
        await page.getByText('Viaje solo ida').click();
        await page.getByText('30', { exact: true }).click({ timeout: 40000 });
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
        const passenger = passengerInfo["Passenger1"];
        await page.getByLabel('Nombre').click();
        await page.getByLabel('Nombre').fill(passenger.name);
        await page.getByLabel('Primer apellido').click();
        await page.getByLabel('Primer apellido').fill(passenger.first_name);
        await page.getByLabel('Primer apellido').press('Tab');
        await page.getByLabel('Segundo apellido').click();
        await page.getByLabel('Segundo apellido').fill(passenger.last_name);
        await page.getByLabel('Selector de tipo de documento').selectOption('0022');
        await page.getByLabel('Número de documento', { exact: true }).click();
        await page.getByLabel('Número de documento', { exact: true }).fill(passenger.document_number);
        await page.getByLabel('Correo electronico').click();
        await page.getByLabel('Correo electronico').fill(passenger.email);
        await page.getByLabel('Teléfono').click();
        await page.getByLabel('Teléfono').fill(passenger.phone);
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
        const expiration_month = (CommonMethods.getCurrentDate().month + 4 ) % 12;
        const expiration_year = CommonMethods.getCurrentDate().year + 3;
        const paymentInfo = passengerInfo["PaymentMethod"];
        await page.locator(SELECTOR.inputCardNumber).fill(paymentInfo.card_number);
        await page.locator(SELECTOR.inputExpirationMonth).fill(expiration_month.toString());
        await page.locator(SELECTOR.inputExpirationYear).fill(expiration_year.toString().slice(-2));
        await page.locator(SELECTOR.inputCVV).fill(paymentInfo.cvv);
        await page.getByRole('button', { name: 'Pagar', exact: true }).click();
    }

    async validateMessage(errorMessage: string) {
        const page = this.page;
        await expect(page.locator(SELECTOR.modalLabel)).toBeVisible();
        await expect(page.locator(SELECTOR.errorRS18)).toBeVisible();
        await page.getByLabel('cerrar', { exact: true }).click();
    }

}