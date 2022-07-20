import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", name: "home", component: () => import("pages/Index.vue") }],
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("layouts/SettingLayout.vue"),
    children: [
      {
        path: "/account",
        name: "settings-account",
        component: () => import("pages/Settings/Account.vue")
      },
      {
        path: "/organizarion",
        name: "settings-organization",
        component: () => import("pages/Settings/Organization.vue")
      },
      {
        path: "/users",
        name: "settings-users",
        component: () => import("pages/Settings/Users.vue")
      }
    ],
    meta: {
      requireAuth: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("pages/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("pages/Register.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    name: "rest",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
