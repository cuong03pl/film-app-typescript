import classNames from "classnames/bind";
import styles from "./Wrapper.module.scss";
import PropTypes from "prop-types";
import React, { ReactNode } from "react";

const cx = classNames.bind(styles);
interface WrapperProps {
  children: ReactNode
}
function Wrapper({ children }:WrapperProps) {
  return <div className={cx("wrapper")}>{children}</div>;
}
Wrapper.propsType = {
  children: PropTypes.node.isRequired,
};
export default Wrapper;
