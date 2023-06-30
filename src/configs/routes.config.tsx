import { DefaultLayout, ProtectedLayout } from "@/shared/components";
import { Route, Router, Routes } from "@solidjs/router";
import { Component, lazy } from "solid-js";

const Home = lazy(() => import("@/pages/Home"));
const Detail = lazy(() => import("@/pages/Detail"));
const Login = lazy(() => import("@/pages/Admin/Login"));
const KanjiManagement = lazy(() => import("@/pages/Admin/KanjiManagement"));
const KanjiForm = lazy(() => import("@/pages/Admin/KanjiForm"));

export const RouteConfig: Component<{}> = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" component={DefaultLayout}>
          <Route path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/:id" component={Detail} />
        </Route>
        <Route path="/" component={ProtectedLayout}>
          <Route path="/kanji" component={KanjiManagement} />
          <Route path="/kanji/form/:id" component={KanjiForm} />
        </Route>
      </Routes>
    </Router>
  );
};
