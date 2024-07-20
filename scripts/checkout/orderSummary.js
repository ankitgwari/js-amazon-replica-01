//named export
import { cart } from '../../data/cart-class.js';
// import { cart, updateProductQuantity, removeFromCart, totalCartQuantity, updateDeliveryOption } from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js';
//default export : we need to export only 1 function. 
import formatCurrency from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { calculateDeliveryDate, deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { renderHeader } from './header.js';


export function renderOrderSummary() {
  let cartSummaryHTML = '';

  cart.cartItems.forEach((cartItem) => {

    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption);


    cartSummaryHTML +=
      `
    <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name js-product-name-${matchingProduct.id}">
                  ${matchingProduct.name}
                </div>
                <div class="product-price js-product-price-${matchingProduct.id}">
                  ${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-input-${matchingProduct.id}">
                  </span>
                  <span class="update-quantity-link link-primary js-update-link js-update-text-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options ">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct, cartItem)}                
              </div>
            </div>
          </div>
    `;
  });

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  // updateHeader();
  renderHeader();
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const { productId } = link.dataset;
      cart.removeFromCart(productId);
      renderPaymentSummary();
      // direct rendering
      renderOrderSummary();
      // using DOM
      // const container = document.querySelector(`.js-cart-item-container-${productId}`);
      // container.remove();
      // updateHeader();
      renderHeader();
    })
  });
  let isWriting = false;
  document.querySelectorAll('.js-update-link').forEach((link) => {
    link.addEventListener('click', () => {
      const { productId } = link.dataset;
      if (!isWriting) {
        document.querySelector(`.update-input-${productId}`).innerHTML = `<input type="number" class="js-update-input-${productId}"></input>`;
        document.querySelector(`.js-update-text-${productId}`).innerHTML = "Save";
        isWriting = true;
      }
      else if (isWriting) {
        const input = document.querySelector(`.js-update-input-${productId}`);
        let newQ = Number(input.value);
        if (newQ > 0 && newQ < 1000)
          cart.updateProductQuantity(productId, newQ);
        else {
          alert("Quantity must be less than 1000 and greater than 0");
        }
        input.remove();
        document.querySelector(`.js-update-text-${productId}`).innerHTML = "Update";
        isWriting = false;
        //updating label
        updatingQuantityLabel(productId);
      }
      renderPaymentSummary();
      renderHeader();
      // updateHeader();
    })
  });

  function updatingQuantityLabel(productId) {
    let matchingItem;

    cart.cartItems.forEach((cartItem) => {
      if (cartItem.productId == productId) {
        matchingItem = cartItem;
      }
    });
    document.querySelector(`.js-quantity-label-${productId}`).innerHTML = matchingItem.quantity;
  }

  // function updateHeader() {
  //   let cartQuantity = totalCartQuantity();
  //   document.querySelector('.js-checkout-header').innerHTML = `${cartQuantity} items`;
  // }

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
      const dateString = calculateDeliveryDate(deliveryOption);
      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)}-`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      html += ` <div class="delivery-option js-delivery-option js-delivery-option-${matchingProduct.id}-${deliveryOption.id}" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
              <input type="radio" ${isChecked ? 'checked' : ''}
                class="delivery-option-input  js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
                name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} Shipping
                    </div>
                  </div>
            </div>
       `
    }
    )
    return html;
  }

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset;
      cart.updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    })
  });
}
