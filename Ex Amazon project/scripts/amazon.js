import {cart} from '../data/cart-class.js';
import {products, loadProducts, loadProductsFetch} from '../data/products.js';

//loadProducts(renderProductsGrid);

await loadProductsFetch();

renderProductsGrid();
async function renderProductsGrid(){
  await loadProductsFetch();

  const url = new URL(window.location.href);
  const search = url.searchParams.get('search');

  let filteredProducts = products;
  if(search){
    filteredProducts = products.filter((product) =>{
      return product.name.toLowerCase().includes(search.toLocaleLowerCase());
    });
  }
  let productHTML = '';

  filteredProducts.forEach((product)=>{
  productHTML += `<div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="${product.getStarsUrl()}">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${product.getPrice()}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      ${product.extraInfoHTML()}
      
      <div class="product-spacer"></div>

      <div class="js-added-to-cart-${product.id} added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id ="${product.id}">
        Add to Cart
      </button>
    </div>`
  });

  document.querySelector('.js-product-grid')
  .innerHTML = productHTML ;

  updateCartQuantity();
  function updateCartQuantity(){
    const cartQuantity = cart.calculateCartQuantity();
    document.querySelector('.js-cart-quantity')
      .innerHTML = cartQuantity;
  }

  const timeoutId = {};

  document.querySelectorAll('.js-add-to-cart')
    .forEach((button)=>{
      button.addEventListener('click', ()=>{
        const {productId} = button.dataset;
        const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
        const quantity = Number(quantitySelector.value);

        cart.addToCart(productId,quantity);
        updateCartQuantity();

        const displayMessage = document.querySelector(`.js-added-to-cart-${productId}`);
        displayMessage.classList.add('added-to-cart-visible');

        clearTimeout(timeoutId[productId]);

        timeoutId[productId] = setTimeout(()=> {
        displayMessage.classList.remove('added-to-cart-visible');
        },1500);
      });
    });

  document.querySelector('.js-search-button')
    .addEventListener('click',() => {
      const search = document.querySelector('.js-search-bar').value;
      window.location.href = `amazon.html?search=${search}`;
    });
}