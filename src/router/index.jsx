import React, {Suspense} from "react";
import { Routes, Route, useNavigate, useLocation, useParams, useSearchParams } from "react-router-dom";
import routes from './router';
import { SpinLoading } from "antd-mobile";

const Element = function(props) {
  let {component: Component, meta} = props;
  let {title = '知乎日报-WebApp' } = meta || {};
  document.title = title;

  let navigate = useNavigate(),
      location = useLocation(),
      params = useParams(),
      [usp] = useSearchParams();
  return <Component navigate={navigate} location={location} params={params} usp={usp}></Component> 
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