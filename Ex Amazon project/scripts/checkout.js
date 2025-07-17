import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/backend-practise.js';

async function loadPage(){
  
  await loadProductsFetch();

  await new Promise((resolve)=>{
    loadCart (()=>{
      resolve('value1');
    });
});

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();
/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve)=>{
    console.log('start promise - checkout.js line 19')
    loadCart (()=>{
      console.log('finished loading')
      resolve('value1');
    });
  }),
  new Promise((resolve)=>{
    loadCart(() => {
      resolve();
    });
  })

]).then((values) => {
  console.log(values);
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/
/*
new Promise((resolve)=>{
  console.log('start promise')
  loadProducts(()=>{
    console.log('finished loading')
    resolve('value1');
  });
}).then((value) => {
  console.log(value);

  return new Promise((resolve)=>{
    loadCart(() => {
      resolve();
    });
  }).then((value) => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();});
  });
*/

/*
loadProducts(()=>{
  loadCart(()=>{
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/