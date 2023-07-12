import React, {useState} from "react";
import HomeHead from "../component/HomeHead";
import _ from "../assets/utils"

const Home = function() {
  let [today, setToday] = useState(_.formatTime(null, "{0}{1}{2}"));
  return <div className="home-box">
    <HomeHead today={today} ></HomeHead>
    
  </div>
}

export default Home;