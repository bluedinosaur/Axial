import React from "react";
import TextField from "@material-ui/core/TextField";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import IconButton from "@material-ui/core/IconButton";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="subscribe">
        <span>Stay up to date with Axial Prosthetics!</span>
        <TextField
          className="input"
          id="standard-basic"
          label="email"
          color="primary"
        />
      </div>
      <div>
        <IconButton>
          <FacebookIcon className="iconbuttons" />
        </IconButton>
        <IconButton>
          <InstagramIcon className="iconbuttons" />
        </IconButton>
        <IconButton>
          <TwitterIcon className="iconbuttons" />
        </IconButton>
      </div>
      <div className="disclaimers">
        <span>© 2020 Axial</span>
        <span>Terms and Conditions</span>
        <span>Privacy Policy</span>
        <span>Cookies</span>
      </div>
    </div>
  );
};

export default Footer;
