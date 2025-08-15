import {addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption} from '../../data/cart.js';

describe('test suite: addToCart', () => {
  beforeEach(()=>{
    spyOn(localStorage, 'setItem');
  });

  afterEach(()=>{
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
  it('adds an existing product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(
      [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }]
    ))
  });

  it('adds a new product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(
      [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]
    ));
    
    expect(cart[0].quantity).toEqual(1);
  });
});

describe('test suite: removeFromCart', ()=>{
  beforeEach(()=>{
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: '1'
      },{
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity:2,
        deliveryOptionId: '2'
      }]);
    });
    loadFromStorage();
  });

  it('remove a productId that is in the cart', ()=>{
    expect(cart.length).toEqual(2);
    removeFromCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual("15b6fc6f-327a-4ec4-896f-486349e85a3d");
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity:2,
      deliveryOptionId: '2'
    }]));
    
  });

  it('remove a productId that is not in the cart', ()=>{
    removeFromCart('does-not-exist');
    expect(cart.length).toEqual(2);

    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[1].productId).toEqual("15b6fc6f-327a-4ec4-896f-486349e85a3d");

    expect(cart[0].quantity).toEqual(1);
    expect(cart[1].quantity).toEqual(2);

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: '1'
      },{
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity:2,
        deliveryOptionId: '2'
      }]));
  });
});

describe('test suite: updateDeliveryOption', ()=>{
  beforeEach(()=>{
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: '1'
      },{
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity:2,
        deliveryOptionId: '2'
      }]);
    });

    loadFromStorage();
  });

  it('update the delivery option of the product', ()=>{

    updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '3');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it('update the delivery option of a productId that is not in the cart', ()=>{
    updateDeliveryOption("83d4ca15-0f35-48f5-b7a3-1ea210004f2e", '3');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '4');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    expect(cart[0].deliveryOptionId).toEqual('1');
    expect(cart[1].deliveryOptionId).toEqual('2');
  });
});