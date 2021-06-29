import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Spinner from "../app/shared/Spinner";
import Table from "./tables/Table";

const Dashboard = lazy(() => import("./dashboard/Dashboard"));

class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/profiles" component={Table} />
          <Redirect to="/dashboard" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;
