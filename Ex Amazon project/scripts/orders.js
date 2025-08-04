import { cart } from "../data/cart-class.js";
import { orders } from "../data/orders.js";
import { renderOrderPage} from "./checkout/orderPageSummary.js";
renderOrderPage();
console.log(orders)
console.log(cart.cartItems);