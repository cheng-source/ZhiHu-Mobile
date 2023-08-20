import React, {useEffect, useState, useRef} from "react";
import HomeHead from "../component/HomeHead";
import _ from "../assets/utils"
import {Swiper, Image,Skeleton, Divider,DotLoading } from 'antd-mobile'
import { Link } from "react-router-dom";
import "./Home.less"
import api from "../api";
import NewsItem from '../component/NewsItem'
import SkeletonAgain from '../component/SkeletonAgain';

const Home = function() {
  let [today, setToday] = useState(_.formatTime(null, "{0}{1}{2}"));
  let [bannerData, setBannerData] = useState([]); // 轮播图数据
  let [newsData, setNewsData] = useState([]);

  const loadingDOM = useRef();

  useEffect(() => {
    (async () => {
      try {
        let {date, stories, top_stories} = await api.queryNewsLatest();
        setToday(date);
        setBannerData(top_stories);
        newsData.push({
          date,
          stories
        });
        setNewsData([...newsData]);
      } catch (error) {console.log(error);}
    })()
  }, []);

  // 第一次 渲染完，设置监听器，实现触底加载 
  useEffect(() => {
      let ob = new IntersectionObserver( async changes => {
      let {isIntersecting} = changes[0];
      if (isIntersecting) {
        const {date} = newsData[newsData.length - 1];
        let res = await api.queryNewsBefore(date);
        newsData.push(res);
        setNewsData([...newsData]);
      };
    })
    let loadingBox = loadingDOM.current;
    
    ob.observe(loadingDOM.current);

    // 在组件销毁释放的时候，手动销毁监听器
    return () => {
      ob.unobserve(loadingBox);
      ob = null;
    }
  }, []);

  
  return <div className="home-box">
    {/* 首部 */}
    <HomeHead today={today} ></HomeHead>

    {/* 轮播图 */}
    <div className="swiper-box">
      {bannerData.length > 0 ? <Swiper loop autoplay>
        {bannerData.map(item => {
          let {hint, image, id, title} = item;
          return <Swiper.Item key={id}>
          <Link to={{
            pathname: `/detail/${id}`
          }}> 
              <Image lazy src={image} />
              <div className="desc">
                <h3 className="title">{title}</h3>
                <p className="author">{hint}</p>
              </div>
            </Link>
          </Swiper.Item>
        })}
      </Swiper> : null}

    </div>

    {/* 新闻列表 */}
   

    {newsData.length === 0 ? <>
      <SkeletonAgain />
    </> : <>
    {newsData.map((item, index) => {
      let {date, stories} = item;
      return <div className="news-box" key={index}>
        {index !== 0 ? <Divider contentPosition="left">{date}</Divider> : null}
        <div className="list">
          {stories.map((cur) => {
            return <NewsItem news={cur} key={cur.id} />
          })}
        </div>
      </div>
    })}

    </>}


    {/* 底部 */}
    <div className="footer" ref={loadingDOM} style={{
      display: newsData.length === 0 ? 'none' : "block"
    }}>
      <span>数据加载中</span>
      <DotLoading />
    </div>
    
  </div>
}

export default Home;