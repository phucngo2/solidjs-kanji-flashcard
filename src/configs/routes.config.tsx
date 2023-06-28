import { Layout } from "@/shared/components";
import { Route, Router, Routes } from "@solidjs/router";
import { Component, lazy } from "solid-js";

const Home = lazy(() => import("@/pages/Home"));
const Detail = lazy(() => import("@/pages/Detail"));

export const RouteConfig: Component<{}> = (props) => {
  return (
    <Router>
      <Routes>
        <Route path="/" component={Layout}>
          <Route path="/" component={Home} />
          <Route path="/:id" component={Detail} />
        </Route>
      </Routes>
    </Router>
  );
};
