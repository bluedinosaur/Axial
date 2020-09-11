import React from "react";
import "./App.css";
import data from "./data";
import NavDrawer from "./Nav/navdrawer";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Footer from "./Nav/footer";

const ItemList = ({ data, onAddOne }) => {
  return (
    <Grid
      container
      className="item-list-container"
      spacing={4}
      justify="center"
    >
      {data.map((itemdata) => (
        <Grid item xs={12} sm={6} md={6} lg={4} xl={4} key={itemdata.name}>
          {/* <FadeInSection> */}
          <Item key={itemdata.id} itemdata={itemdata} onAddOne={onAddOne} />
          {/* </FadeInSection> */}
        </Grid>
      ))}
    </Grid>
  );
};

const Item = ({ itemdata, onAddOne }) => {
  return (
    <div className="item">
      <div className="image-crop">
        <img
          className="imagefront"
          src={itemdata.imgurlfront}
          alt="imagefront"
        />
        <img
          src={itemdata.imgurlback}
          alt="imageback"
          className="img-on-hover"
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

// function FadeInSection(props) {
//   const [isVisible, setVisible] = React.useState(true);
//   const domRef = React.useRef();
//   React.useEffect(() => {
//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => setVisible(entry.isIntersecting));
//     });
//     observer.observe(domRef.current);
//     return () => observer.unobserve(domRef.current);
//   }, []);
//   return (
//     <div
//       className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
//       ref={domRef}
//     >
//       {props.children}
//     </div>
//   );
// }

class App extends React.Component {
  state = {
    cart: [],
    open: false,
    vertical: "top",
    horizontal: "center",
    data: data,
  };

  handleSelectFilter = (event, value) => {
    if (value === "all") {
      this.setState({ data: data });
    } else {
      const filtereddata = data.filter((item) => {
        return item.type.toLowerCase().includes(value.toLowerCase());
      });
      this.setState({
        data: filtereddata,
      });
    }
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
          selectFilter={this.handleSelectFilter}
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
        <ItemList data={this.state.data} onAddOne={this.handleAddToCart} />
        <Footer />
      </div>
    );
  }
}

export default App;
