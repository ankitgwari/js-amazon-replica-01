import { loadProducts } from "../data/products.js";
import { renderHeader } from "./checkout/header.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";

loadProducts(() => {
    renderHeader();
    renderOrderSummary();
    renderPaymentSummary();
});
