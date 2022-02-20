import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }],
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
        path: "/user",
        name: "settings-user",
        component: () => import("pages/Settings/User.vue")
      },
      {
        path: "/organizarion",
        name: "settings-organization",
        component: () => import("pages/Settings/Organization.vue")
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
    path: "/:catchAll(.*)*",
    name: "rest",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
