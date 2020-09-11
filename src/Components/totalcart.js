import React from "react";
import data from "../data";

const Total = ({ cart }) => {
  let itemCounts = cart.reduce((item, itemId) => {
    item[itemId] = item[itemId] || 0;
    item[itemId]++;
    return item;
  }, {});

  let cartItems = Object.keys(itemCounts).map((itemId) => {
    var item = data.find((item) => item.id === parseInt(itemId, 10));
    return {
      ...item,
      count: itemCounts[itemId],
    };
  });

  let total = cartItems.reduce((fullAmount, item) => {
    return fullAmount + item.price * item.count;
  }, 0);

  // let totalItems = cartItems.reduce((total, item) => {
  //   return total + item.count;
  // }, 0);

  return <span>$ {total}</span>;
};

export default Total;
