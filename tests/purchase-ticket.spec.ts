import { test, expect } from '@playwright/test';
import PurchaseTicket from '../src/pages/searchAndPurchase/purchaseTicket.page';

test('@PurchaseWithInvalidCreditCard - test', async ({ page }) => {
 
  const baseUrl = "https://www.renfe.com/es/es";
  const purchaseTicket = new PurchaseTicket(page)
  await purchaseTicket.gotoWebsite(baseUrl);
  await purchaseTicket.acceptCookies();

  // await purchaseTicket.searchAndSelectDestination("VALENCIA JOAQUIN SOROLLA", "BARCELONA-SANTS");
  // await purchaseTicket.selectTrainTicket();

  // await purchaseTicket.setPersonalInformation();
  // await purchaseTicket.skipPersonalizarViaje();

  // await purchaseTicket.setPaymentProcess();
  // await purchaseTicket.fillCreditCardInfo();

  // await purchaseTicket.validateMessage("errorMessage");


});