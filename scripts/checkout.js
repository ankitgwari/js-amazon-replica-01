import { loadCart } from "../data/cart-class.js";
import {loadProductsFetch } from "../data/products.js";
import { renderHeader } from "./checkout/header.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";

//async await function
async function loadPage(){

    await loadProductsFetch();

    await new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        })
    });

    renderHeader();
    renderOrderSummary();
    renderPaymentSummary();

}
loadPage();

//running all promise together
/*
Promise.all([
    loadProductsFetch(),
    new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        })
    })
]).then(()=>{
    renderHeader();
    renderOrderSummary();
    renderPaymentSummary();
});
*/
//promise instead of callback;
/*
new Promise((resolve)=>{
    loadProducts(()=>{
        resolve();
    })
}).then (()=>{
    //next step
    return new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        })
    });
}).then(()=>{
    renderHeader();
    renderOrderSummary();
    renderPaymentSummary();
})
*/
/*
loadProducts(() => {
    renderHeader();
    renderOrderSummary();
    renderPaymentSummary();
});
*/
