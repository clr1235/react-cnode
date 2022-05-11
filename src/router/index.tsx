import { RouteObject } from "react-router-dom";
//代码分割 React.lazy 和 Suspense 技术还不支持服务端渲染。所以使用loadable
import loadable from "@loadable/component";
const NotFound404 = loadable(
  () => import(/* webpackChunkName: "errorPage404" */ "@pages/errorPages/404")
);
const Login = loadable(
  () => import(/* webpackChunkName: "login" */ "@pages/login/index")
);
const ProjectList = loadable(
  () => import(/* webpackChunkName: "projectList" */ "@pages/projectList/index")
);

const routes: RouteObject[] = [
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "projectList",
        element: <ProjectList />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound404 />,
  },
];

export default routes;
