import  React, { ElementType, ReactNode } from 'react';
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./Button.module.scss";
import PropTypes from "prop-types";
const cx = classNames.bind(styles);


 interface ButtonProps {
  primary?: boolean,
  followBtn?: boolean,
  loginGoogleBtn?: boolean,
  favouriteBtn?: boolean,
  watchBtn?: boolean,
  loginBtn?: boolean,
  selectedBtn?: boolean,
  seeMoreBtn?: boolean,
  children?: ReactNode,
  onClick?: Function,
  to?: string,
  href?: string,
  className?: string,
  leftIcon?: ReactNode,
}

 function Button ({
  primary,
  followBtn,
  loginGoogleBtn,
  favouriteBtn,
  watchBtn,
  loginBtn,
  selectedBtn,
  seeMoreBtn,
  children,
  onClick,
  to,
  href,
  className,
  leftIcon,
  ...passprops
}: ButtonProps) {
  let Comp: ElementType = "button";

  const classes = cx({
    flex: "flex",
    primary,
    followBtn,
    loginBtn,
    watchBtn,
    loginGoogleBtn,
    favouriteBtn,
    selectedBtn,
    seeMoreBtn,
    className,
  });

  let props: any = { onClick, ...passprops };
  if (to) {
    props.to = to;
    Comp = Link;
  }
  if (href) {
    Comp = "a";
    props.href = href;
  }

  return (
    <Comp className={classes} {...props}>
      {leftIcon && <span className={"inline-block"}>{leftIcon}</span>}
      {<span className="text-center">{children}</span>}
    </Comp>
  );
}




export default Button;
