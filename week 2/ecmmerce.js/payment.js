// payment.js

import { reduceStock } from './product.js';
import { getCartItems, getCartTotal, clearCart } from './cart.js';
import { applyDiscount } from './discount.js';

export function validatePaymentMethod(method) {
  return ['card', 'upi', 'cod'].includes(method);
}

export function processPayment(paymentMethod, couponCode = null) {
  const items = getCartItems();
  if (items.length === 0)
    return { status: "failed", message: "Cart is empty" };

  if (!validatePaymentMethod(paymentMethod))
    return { status: "failed", message: "Invalid payment method" };

  const subtotal = getCartTotal();

  const discountData = couponCode
    ? applyDiscount(subtotal, couponCode, items)
    : {
        originalTotal: subtotal,
        discount: 0,
        finalTotal: subtotal
      };

  items.forEach(item =>
    reduceStock(item.id, item.quantity)
  );

  clearCart();

  return {
    orderId: generateOrderId(),
    items,
    subtotal,
    discount: discountData.discount,
    total: discountData.finalTotal,
    paymentMethod,
    status: "success",
    message: "Order placed successfully"
  };
}

function generateOrderId() {
  return 'ORD' + Date.now();
}