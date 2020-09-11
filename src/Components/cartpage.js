import React from "react";
import PropTypes from "prop-types";
import Item from "./item";
import "./cartpage.css";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IconButton from "@material-ui/core/IconButton";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";

function CartPage({ items, onAddOne, onRemoveOne, total }) {
  return (
    <ul className="CartPage-items">
      {items.map((item) => (
        <li key={item.id} className="CartPage-item">
          <Item item={item}>
            <div className="CartItem-controls">
              <IconButton onClick={() => onRemoveOne(item)}>
                <IndeterminateCheckBoxIcon className="CartItem-removeOne" />
              </IconButton>
              <span className="CartItem-count">{item.count}</span>
              <IconButton onClick={() => onAddOne(item)}>
                <AddBoxIcon className="CartItem-addOne" />
              </IconButton>
            </div>
          </Item>
        </li>
      ))}
    </ul>
  );
}

CartPage.propTypes = {
  items: PropTypes.array.isRequired,
  onAddOne: PropTypes.func.isRequired,
  onRemoveOne: PropTypes.func.isRequired,
};

export default CartPage;
