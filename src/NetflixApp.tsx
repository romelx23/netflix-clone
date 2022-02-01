import React from "react";
import { DashboardRoutes } from "./router/DashboardRoutes";
// import { HomeScreen } from "./screens/Home/HomeScreen";
import './App.scss'
export const NetflixApp = () => {
  return (
    <div className="container__general">
      <DashboardRoutes/>
    </div>
  );
};
