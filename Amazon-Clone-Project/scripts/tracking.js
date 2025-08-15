import { getOrder } from "../data/orders.js";
import {getProduct, loadProductsFetch} from '../data/products.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

trackingPageSummary();

async function trackingPageSummary(){
   await loadProductsFetch();
 
   const url = new URL(window.location.href)
   const orderId = url.searchParams.get('orderId');
   const productId = url.searchParams.get('productId');
  
   const order = getOrder(orderId);
   const product = getProduct(productId);

   let productDetails ;

   order.products.forEach(details => {
      if(details.productId === productId){
         productDetails = details;
      }
   });
   
   const orderStringTiming = dayjs(productDetails.estimatedDeliveryTime).format('MMMM D');
   
   let trackPageHTML = '';
   
   trackPageHTML += `<div class="order-tracking">
           <a class="back-to-orders-link link-primary" href="orders.html">
             View all orders
           </a>
   
           <div class="delivery-date">
             Arriving on ${orderStringTiming}
           </div>
   
           <div class="product-info">
             ${product.name}
           </div>
   
           <div class="product-info">
             Quantity: ${productDetails.quantity}
           </div>
   
           <img class="product-image" src="${product.image}">
   
           <div class="progress-labels-container">
             <div class="progress-label ${progress() >= 0 && progress() <=49 ? 'current-status': ''}">
               Preparing
             </div>
             <div class="progress-label ${progress() > 49 && progress() <99 ? 'current-status': ''}">
               Shipped
             </div>
             <div class="progress-label ${progress() ===100 ? 'current-status': ''}">
               Delivered
             </div>
           </div>
   
           <div class="progress-bar-container">
             <div class="progress-bar" style="width:${progress()}%;"></div>
           </div>
         </div>`;
       
   document.querySelector('.js-main')
       .innerHTML = trackPageHTML;

   function progress(){
   const currentTime = dayjs();
   const orderTime = dayjs(order.orderTime);
   const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);
   
   const percentProgress = ((currentTime - orderTime)/(deliveryTime - orderTime))*100

   return percentProgress;
   }
   
}