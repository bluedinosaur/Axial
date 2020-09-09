import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PanToolIcon from "@material-ui/icons/PanTool";
import AirlineSeatLegroomExtraIcon from "@material-ui/icons/AirlineSeatLegroomExtra";
import FaceIcon from "@material-ui/icons/Face";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import SearchAppBar from "./searchappbar";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import data from "./data";
import CartPage from "./cartpage";
import Total from "./totalcart";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function NavDrawer({ cart, onAddOne, onRemoveOne }) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
    right: false,
  });

  const renderCart = () => {
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

    if (cartItems.length === 0) {
      return <div className="EmptyCart">Your cart is empty.</div>;
    } else {
      return (
        <CartPage
          items={cartItems}
          onAddOne={onAddOne}
          onRemoveOne={onRemoveOne}
        />
      );
    }
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const leftlist = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
          <OutlinedInput fullWidth small></OutlinedInput>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AllInclusiveIcon />
          </ListItemIcon>
          <ListItemText primary="All" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PanToolIcon />
          </ListItemIcon>
          <ListItemText primary="Arms" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AirlineSeatLegroomExtraIcon />
          </ListItemIcon>
          <ListItemText primary="Legs" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <FaceIcon />
          </ListItemIcon>
          <ListItemText primary="Head" />
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  const rightlist = (anchor) => (
    <div className="rightdrawer">
      <div>
        <div
          className={clsx(classes.list, {
            [classes.fullList]: anchor === "top" || anchor === "bottom",
          })}
          role="presentation"
        >
          <List>
            {/* <ListItem></ListItem> */}
            <main className="App-content">{renderCart()}</main>
          </List>
          <Divider />
        </div>
      </div>
      <div className="total">
        <div>Total</div>
        <div>
          <Total cart={cart} />
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <SearchAppBar
          clickOpenLeft={toggleDrawer("left", true)}
          clickOpenRight={toggleDrawer("right", true)}
        />
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {leftlist("left")}
        </Drawer>
      </React.Fragment>
      <React.Fragment>
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          {rightlist("right")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
