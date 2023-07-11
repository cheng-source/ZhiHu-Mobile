import React from "react";
import PropTypes from 'prop-types'
import { NavBar } from 'antd-mobile';
const NavBarAgain = function(props) {
  let {title} = props;

  const handleBack = () => {

  };

  return <NavBar back='返回' onBack={handleBack}>
    {title}
</NavBar>
}

NavBarAgain.defaultProps = {
  title: '个人中心'
}

NavBarAgain.prototype = {
  title: PropTypes.string
}

export default NavBarAgain;