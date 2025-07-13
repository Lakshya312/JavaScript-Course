import 
{Cart, cart} from "../../data/cart-class.js";
import { getProduct } from "../../data/products.js";
import  formatCurrency  from "../utils/money.js";
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

export function renderOrderSummary(){
  let cartSummaryHTML = '';
  cart.cartItems.forEach((cartItem)=>{
  const productId = cartItem.productId;

  const matchingProduct = getProduct(productId);

  const {deliveryOptionId} = cartItem ;

  const deliveryOption = getDeliveryOption(deliveryOptionId);

  const dateString = calculateDeliveryDate(deliveryOption);

  cartSummaryHTML += `
      <div class="cart-item-container
        js-cart-item-container
        js-cart-item-container-${matchingProduct.id}">
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
                  Quantity: <span class="js-quantity-label quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id = "${matchingProduct.id}">
                Update
              </span>
              <input class="js-quantity-input-${matchingProduct.id} quantity-input">
                    <span class="js-save-quantity-link save-quantity-link link-primary" data-product-id="${matchingProduct.id}">Save</span>
                    <span class="js-delete-link-${matchingProduct.id} delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
              </div>
            </div>
          </div>
        </div>
      </div>
  `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem){
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
      const dateString = calculateDeliveryDate(deliveryOption);
      const priceString = deliveryOption.priceCents === 0
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)}`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option js-delivery-option-${matchingProduct.id}-${deliveryOption.id}"
          data-product-id = "${matchingProduct.id}"
          data-delivery-option-id = "${deliveryOption.id}">
          <input type="radio"
            ${isChecked ? 'checked': ''}
            class="delivery-option-input js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
            name="delivery-option-${matchingProduct.id}"
            value="${deliveryOption.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} - Shipping
            </div>
          </div>
        </div>
      `;
    });

    return html;
  }

  document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-quantity-link')
    .forEach((link)=>{
      link.addEventListener('click', ()=>{
        const {productId} = link.dataset;
        removeFromCart(productId);

        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove(); 
         
        cart.updateCartQuantity();
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
      });
    });

  document.querySelectorAll('.js-delivery-option')
  .forEach((element)=>{
    element.addEventListener('click',()=>{
      const {productId, deliveryOptionId} = element.dataset ; 
      cart.updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll('.js-update-quantity-link')
    .forEach((updateLink)=>{
      updateLink.addEventListener('click',()=>{
        const productId = updateLink.dataset.productId;
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.add('is-editing-quantity');
      });
    });

  document.querySelectorAll('.js-save-quantity-link')
    .forEach((savedQuantity)=>{
      const productId = savedQuantity.dataset.productId;
      const inputElement = document.querySelector(`.js-quantity-input-${productId}`);

      savedQuantity.addEventListener('click',()=>{
      handleCartQuantity(productId);
      });

      inputElement.addEventListener('keydown',(event)=>{
        if(event.key === 'Enter'){
          handleCartQuantity(productId);
        }
      });
    });

  function handleCartQuantity(productId){
    const inputElement = document.querySelector(`.js-quantity-input-${productId}`);
    const inputValue = Number(inputElement.value);

    if(inputValue>=0 && inputValue<1000){
      cart.updateQuantity(productId, inputValue);
      cart.updateCartQuantity();

      inputElement.value = '';
    
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.remove('is-editing-quantity');

      renderPaymentSummary();
      renderCheckoutHeader();
      renderOrderSummary();

    }else if(inputValue>=1000){
      alert('Value is too large!');
      inputElement.value = '';
    }else if(inputValue<0){
      alert('Invalid value!');
      inputElement.value = '';
    }
  }
}
