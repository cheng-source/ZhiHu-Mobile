import React, {useEffect, useMemo} from "react";
import timg from "../assets/images/timg.jpg"
import "./homeHead.less";
import { connect } from "react-redux";
import state from '../store/index';
import action from "../store/actions";
import { useNavigate } from "react-router-dom";

const HomeHead = function(props) {
  const navigate = useNavigate();
  let {today, info, queryUserInfoAsync} = props;
  console.log(props);
  let time = useMemo(() => {
    let [,month, day] = today.match(/^\d{4}(\d{2})(\d{2})$/),
        area = ['', '一','二','三','四','五','六','七','八','九','十','十一','十二'];

    return {
      month: area[+month]+ '月',
      day
    }
  }, [today]);

  useEffect(() => {
      if (!info) {
        queryUserInfoAsync();
      }
  }, []);

  return <div className="home-head-box">
    <div className="info">
      <div className="date">
        <span>{time.day}</span>
        <span>{time.month}</span>
      </div>
      <div className="title">
        知乎日报
      </div>

    </div>

    <div className="picture" onClick={() => {
      navigate('/personal')
    }}>
      <img src={info ? info.pic : timg} alt="" />
    </div>
  </div>
}

export default connect(state => state.base, action.base)(HomeHead);