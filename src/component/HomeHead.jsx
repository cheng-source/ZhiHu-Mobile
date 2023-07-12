import React, {useMemo} from "react";
import timg from "../assets/images/timg.jpg"
import "./homeHead.less";

const HomeHead = function(props) {
  let {today} = props;
  let time = useMemo(() => {
    let [,month, day] = today.match(/^\d{4}(\d{2})(\d{2})$/),
        area = ['', '一','二','三','四','五','六','七','八','九','十','十一','十二'];

    return {
      month: area[+month]+ '月',
      day
    }
  }, [today]);

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

    <div className="picture">
      <img src={timg} alt="" />
    </div>
  </div>
}

export default HomeHead;