import { loadCart } from "../data/cart-class.js";
import { loadProductsFetch, products } from "../data/products.js";
import { renderHeader } from "./checkout/header.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";

//async await function
async function loadPage() {
    try {
        //throw 'error1';
        await loadProductsFetch();

        await new Promise((resolve, reject) => {
            //throw 'error2';
            loadCart(() => {
                // reject('error3');
                resolve();
            })
        });
    }
    catch (error) {
        console.log('Unexpected error occured');
    }
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
//using callback
/*
loadProducts(() => {
    renderHeader();
    renderOrderSummary();
    renderPaymentSummary();
});
*/
