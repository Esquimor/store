import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("pages/Index.vue")
      },
      {
        path: "order/:id",
        name: "order",
        component: () => import("pages/Order/Order.vue")
      },
      {
        path: "furniture",
        name: "furniture",
        component: () => import("pages/Furniture/Furniture.vue")
      },
      {
        path: "basket",
        name: "basket",
        component: () => import("pages/Basket/Basket.vue")
      },
      {
        path: "inventory",
        name: "inventory",
        component: () => import("pages/Inventory/Inventory.vue")
      },
    ],
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
      },
      {
        path: "/address",
        children: [
          {
            path: "",
            name: "settings-address",
            component: () => import("pages/Settings/Address/Address.vue")
          },
          {
            path: "/new",
            name: "settings-address-new",
            component: () => import("pages/Settings/Address/AddressNew.vue")
          },
          {
            path: "/update/:id",
            name: "settings-address-edit",
            component: () => import("pages/Settings/Address/AddressEdit.vue")
          }
        ]
      },
      {
        path: "/inventory",
        name: "settings-inventory",
        component: () => import("pages/Settings/Inventory.vue")
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
    path: "/password-forgotten",
    name: "passwordForgotten",
    component: () => import("pages/PasswordForgotten.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("pages/Register.vue"),
  },
  {
    path: "/register-completed",
    name: "registerCompleted",
    component: () => import("pages/RegisterCompleted.vue"),
  },
  {
    path: "/register-validated/:code",
    name: "registerValidated",
    component: () => import("pages/RegisterValidated.vue"),
  },
  {
    path: "/reset-password/:email/:code",
    name: "resetPassword",
    component: () => import("pages/ResetPassword.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    name: "rest",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
