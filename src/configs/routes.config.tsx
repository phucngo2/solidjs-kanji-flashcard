import {
  DefaultLayout,
  ProtectedLayout,
  RematchDynamic,
} from "@/shared/components";
import { Route, Router, Routes } from "@solidjs/router";
import { Component, lazy } from "solid-js";

const Home = lazy(() => import("@/pages/Home"));
const Random = lazy(() => import("@/pages/Random"));
const KanjiList = lazy(() => import("@/pages/Kanji/KanjiList"));
const KanjiDetail = lazy(() => import("@/pages/Kanji/KanjiDetail"));
const KanjiManagement = lazy(() => import("@/pages/Admin/KanjiManagement"));
const KanjiForm = lazy(() => import("@/pages/Admin/KanjiForm"));

export const RouteConfig: Component<{}> = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" component={DefaultLayout}>
          <Route path="/" component={Home} />
          <Route path="/random" component={Random} />
          <Route path="/kanji" component={KanjiList} />
          <Route
            path="/kanji/:id"
            element={<RematchDynamic component={KanjiDetail} />}
          />
        </Route>
        <Route path="/protected" component={ProtectedLayout}>
          <Route path="/kanji" component={KanjiManagement} />
          <Route path="/kanji/form/:id" component={KanjiForm} />
        </Route>
      </Routes>
    </Router>
  );
};
