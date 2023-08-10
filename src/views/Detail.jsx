import React, { useState, useEffect } from "react";
import { LeftOutline,MessageOutline,LikeOutline,StarOutline,SendOutline } from 'antd-mobile-icons'
import { Badge } from 'antd-mobile'
import "./Detail.less"
import _ from '../api/index'
import SkeletonAgain from "../component/SkeletonAgain";
import { flushSync } from "react-dom";

const Detail = function(props) {
  let {navigate, params} = props;
  
  let [info, setInfo] = useState(null),
      [extra, setExtra] = useState(null);

  let link;
  const handleCSS = (cssArray) => {
    if (!Array.isArray(cssArray)) return;
    const css = cssArray[0];   
    if (!css) return;

    link = document.createElement('link')
    link.rel = "stylesheet";
    link.href = css;
    document.head.appendChild(link);
  };

  const handleTitle = (title) => {
    const titleDOM = document.getElementsByClassName('question-title')[0]
    titleDOM.innerText = title;

  }

  const handleImage = (result) => {
    const imgPlaceHolder = document.getElementsByClassName('img-place-holder')[0];
    console.log(imgPlaceHolder);
    if (!imgPlaceHolder) return;
    let temImg = new Image();
    temImg.src = result.image;
    temImg.onload = () => {
      imgPlaceHolder.appendChild(temImg);
    };

    temImg.onerror = () => {
      let parent = imgPlaceHolder.parent;
      parent.parentNode.removeChild(parent);
    }

  }
  useEffect(() => {
    (async () => {
      const result = await _.queryNewsInfo(params.id);
      flushSync(() => {
        setInfo(result);
        handleCSS(result.css);
      })
      handleTitle(result.title)
      handleImage(result);
    })();
    return () => {
      if (link) document.head.removeChild(link)
    }
  }, [])

  return <div className="detail-box">
    {/* 返回图标 */}
    {!info ? <SkeletonAgain /> : <div className="content" dangerouslySetInnerHTML={{
      __html: info.body
    }}>
      </div>}
    

    {/* 底部图标 */}
    <div className="tab-bar">

      <div className="back" onClick={() => {
        navigate(-1);
      }}><LeftOutline /></div>

      <div className="icons">
        <Badge content='5'><MessageOutline /></Badge>
        <Badge content='5'><LikeOutline /></Badge>
        <span><StarOutline /></span>
        <span><SendOutline /></span>
      </div>

    </div>
  </div>
}

export default Detail;