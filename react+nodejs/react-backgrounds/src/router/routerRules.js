/*
 * @Descripttion:
 * @version:
 * @Author: peng
 * @Date: 2021-06-25 14:43:55
 * @LastEditors: peng
 * @LastEditTime: 2021-06-25 15:54:33
 */
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getCookies } from "../utils/session";

const tokens = getCookies() || "";
console.log(tokens,'token')
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      tokens ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
