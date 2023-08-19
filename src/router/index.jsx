import React, {Suspense, useEffect, useState} from "react";
import { Routes, Route, useNavigate, useLocation, useParams, useSearchParams, Navigate } from "react-router-dom";
import routes from './router';
import { SpinLoading, Toast } from "antd-mobile";
import store from "../store";
import actions from '../store/actions'
import { DotLoading } from "antd-mobile";

const Element = function(props) {
  let {component: Component, meta, path} = props;
  let {title = '知乎日报-WebApp' } = meta || {};
  document.title = title;


  
  const checkLogin = function(path) {
    const checkList = ['/personal', '/store', '/update'];
    let {base: {info}} =  store.getState();
    return !info && checkList.includes(path);
  }
  
  let isShow = !checkLogin(path);
  let [_, setRandom] = useState(0);

  useEffect(() => {
    if (isShow) return;
    (async () => {
      let infoAction = await actions.base.queryUserInfoAsync();
      let info = infoAction.info;
      if (!info) {
        Toast.show({
          icon: 'fail',
          content: '请先登录'
        })
        return navigate({
          pathname: '/login',
          search: `?to=${path}`
        }, {
          replace: true
        }) 
      }
      store.dispatch(infoAction);
      setRandom(+new Date());
    })();
  })
  
  let navigate = useNavigate(),
      location = useLocation(),
      params = useParams(),
      [usp] = useSearchParams();
  return <>
  {isShow ? <Component navigate={navigate} location={location} params={params} usp={usp}></Component> : <DotLoading />  } 
  </> 
}

export default function RouterView(){
  return <Suspense fallback={<SpinLoading style={{ '--size': '48px' }} />}>
    <Routes>
      {routes.map(item => {
        let {name, path} = item;
        return <Route key={name} path={path} element={<Element {...item}></Element>} />
      })}
    </Routes>
  </Suspense>
}