import React, { useState, useEffect,useMemo } from "react";
import { LeftOutline,MessageOutline,LikeOutline,StarOutline,SendOutline } from 'antd-mobile-icons'
import { Badge, Toast } from 'antd-mobile'
import "./Detail.less"
import _ from '../api/index'
import SkeletonAgain from "../component/SkeletonAgain";
import { flushSync } from "react-dom";
import { connect } from "react-redux";
import action from "../store/actions";
import api from "../api/index";

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

  // 登录、收藏
  let {
    base: {info: userInfo}, queryUserInfoAsync, 
    location,
    store: {list: storeList}, queryStoreList, clearStoreList, removeStoreListById
  } = props;

  useEffect(() => {
    (async () => {
      if (!userInfo) {
        let {info} = await queryUserInfoAsync();
        userInfo = info;
      } 
      if (userInfo && !storeList) {
        queryStoreList();
      }
    })()
  }, []);

  let isStore = useMemo(() => {
    if (!storeList) return false;
    return storeList.some(item => {
      return item.news.id === params.id
    });
  }, [storeList, params.id])

  const handleStore = async () => {
    console.log(isStore, userInfo);
    if (!userInfo) {
      Toast.show({
        icon: 'fail',
        content: '请先登录'
      });
      return navigate({
        pathname: '/login',
        search: `?to=${location.pathname}`
      }, {
        replace: true
      })
    }
    if (isStore) {
      
      let item = storeList.find(item => {
        return +item.news.id === +params.id;
      })
      if (!item) return;
      let {code} = await api.storeRemove(item.id);
      console.log(code);
      if (+code !== 0) {
        Toast.show({
          icon: 'fail',
          content: '操作失败'
        });
        return;
      } 
      Toast.show({
        icon: 'success',
        content: '操作成功'
      })
      removeStoreListById(item.id);
      return;
    }
    try {
      let {code} = await api.store(params.id);
      if (+code !== 0) {
        Toast.show({
          icon: 'fail',
          content: '收藏失败'
        });
        return;
      } 
      Toast.show({
        icon: 'success',
        content: '收藏成功'
      })
      queryStoreList();
    } catch (error) {
      
    }

  }

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
        <span className={isStore ? 'stored' : ''} onClick={handleStore}><StarOutline /></span>

        <span><StarOutline /></span>
      </div>

    </div>
  </div>
}

export default connect(state => state, {...action.base, ...action.store})(Detail);