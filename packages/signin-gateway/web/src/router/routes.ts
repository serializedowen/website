import Account from "../components/Account";
import { user, tourist } from "../permission";
import Login from "../components/Login";
const routes = [
  {
    path: "/account",
    component: Account,
    permission: [user],
    routes: [],
  },
  {
    path: "/login",
    component: Login,
    permission: [tourist],
  },
];

export default routes;
