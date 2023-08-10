import React from "react";
import {Image} from 'antd-mobile'
import "./NewsItem.less"
import { Link } from "react-router-dom";


const NewsItem = function(props) {
  let {title,id,images,hint} = props.news;
  
  return <Link to={{pathname: `/detail/${id}`}}>
     <div className="news-item-box">
        <div className="content">
          <h4 className="title">{title}</h4>
          <span className="author">{hint}</span>
        </div>
        <Image lazy src={images} />
      </div>
  </Link>

}

export default NewsItem;