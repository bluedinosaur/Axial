import React from "react";
import "./App.css";
import data from "./data";
import NavDrawer from "./navdrawer";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";

const ItemList = ({ data, onAddOne }) => {
  return (
    <div className="item-list-container">
      {data.map((itemdata) => (
        <FadeInSection>
          <Item key={itemdata.id} itemdata={itemdata} onAddOne={onAddOne} />
        </FadeInSection>
      ))}
    </div>
  );
};

const Item = ({ itemdata, onAddOne }) => {
  return (
    <div className="item">
      <div className="image-crop">
        <img src={itemdata.imgurlfront} alt="imagefront" height="300px" />
        <img
          src={itemdata.imgurlback}
          alt="imageback"
          className="img-on-hover"
          height="300px"
        />
      </div>
      <Label
        name={itemdata.name}
        price={itemdata.price}
        onAddOne={onAddOne}
        itemdata={itemdata}
      />
    </div>
  );
};

const Label = ({ name, price, onAddOne, itemdata }) => {
  return (
    <div className="label">
      <div>
        <div className="labelname">{name}</div>
        <div className="labelprice">$ {price}</div>
      </div>
      <div className="addcart">
        <Tooltip title="Add to Cart">
          <IconButton onClick={() => onAddOne(itemdata)}>
            <AddShoppingCartIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

function FadeInSection(props) {
  const [isVisible, setVisible] = React.useState(true);
  const domRef = React.useRef();
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting));
    });
    observer.observe(domRef.current);
    return () => observer.unobserve(domRef.current);
  }, []);
  return (
    <div
      className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
      ref={domRef}
    >
      {props.children}
    </div>
  );
}

class App extends React.Component {
  state = {
    cart: [],
    open: false,
    vertical: "top",
    horizontal: "center",
  };

  handleAddToCart = (item) => {
    this.setState({
      cart: [...this.state.cart, item.id],
      open: true,
    });
    console.log(this.state.cart);
  };

  handleRemoveOne = (item) => {
    let index = this.state.cart.indexOf(item.id);
    this.setState({
      cart: [
        ...this.state.cart.slice(0, index),
        ...this.state.cart.slice(index + 1),
      ],
    });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div className="app-container">
        <NavDrawer
          cart={this.state.cart}
          onAddOne={this.handleAddToCart}
          onRemoveOne={this.handleRemoveOne}
        />
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={this.state.open}
          autoHideDuration={2000}
          onClose={this.handleClose}
          message="Added to Cart!"
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={this.handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
        <ItemList data={data} onAddOne={this.handleAddToCart} />
      </div>
    );
  }
}

export default App;
