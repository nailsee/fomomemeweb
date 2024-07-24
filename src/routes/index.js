import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import * as View from "../pages/view";
import { Spin } from "antd";

const RouteConfig = ()=> {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);
  const Loading = () => {
    return (
      <div className="loading-route">
        <Spin size="large" />
      </div>
    );
  };
  return (
    <Routes>
      <Route
        path="/"
        element={
          <React.Suspense fallback={<Loading />}>
            <View.IndexView />
          </React.Suspense>
        }
      >
      
        <Route
          path="/create"
          element={
            <React.Suspense fallback={<Loading />}>
                <View.CreateView />
            </React.Suspense>
          }
        ></Route>
      
        <Route
          path="/profile"
          element={
            <React.Suspense fallback={<Loading />}>
              <View.ProfileView />
            </React.Suspense>
          }
        ></Route>
    
        {/* <Route
          path="*"
          element={
            <React.Suspense fallback={<Loading />}>
              <View.PageNotFound />
            </React.Suspense>
          }
        ></Route> */}
      </Route>
    </Routes>
  );
};

export default RouteConfig;
