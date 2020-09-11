import React from "react";
import PropTypes from "prop-types";
import "./item.css";

const Item = ({ item, children }) => (
  <div className="Item">
    <div className="Item-label">
      <div className="image-crop2">
        <img src={item.imgurlfront} alt="imagefront" height="60px" />
      </div>
      <div className="Item-label2">
        <div className="Item-title">{item.name}</div>
        <div className="Item-price">${item.price}</div>
      </div>
    </div>
    <div>{children}</div>
  </div>
);

Item.propTypes = {
  item: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export default Item;
