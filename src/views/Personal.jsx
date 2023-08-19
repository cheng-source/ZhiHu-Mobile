import React from "react";
import NavBarAgain from "../component/NavBarAgain";
import { RightOutline } from 'antd-mobile-icons'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import action from "../store/actions";
import _ from './../assets/utils'
import './Personal.less'

const Personal = function(props) {
  console.log(props);
  const {info, clearStoreList, clearUserInfo, navigate} = props
  const handleOut = () => {
    clearStoreList();
    clearUserInfo();
    _.storage.remove('tk');
    navigate('/login?to=/personal', {
      replace: true
    })
  }

  return <div className="personal-box">
    <NavBarAgain></NavBarAgain>
    <div className="baseInfo">
      <img src={info.pic} alt="" />
      <p className="name">{info.name}</p>
    </div>
    <div>
        <Link to='/store' className="tab">
          <span>我的收藏</span>
          <RightOutline />
        </Link>
      <div className="tab" onClick={handleOut}>
        <span>退出登录</span>
        <RightOutline />
      </div>
      

    </div>
  </div>
}

export default connect(
  state => state.base,
  {
    clearUserInfo: action.base.clearUserInfo,
    clearStoreList: action.store.clearStoreList,
  }
)(Personal);