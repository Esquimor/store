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
        path: "/settings/account",
        name: "settings-account",
        component: () => import("pages/Settings/Account.vue")
      },
      {
        path: "/settings/organizarion",
        name: "settings-organization",
        component: () => import("pages/Settings/Organization.vue")
      },
      {
        path: "/settings/users",
        name: "settings-users",
        component: () => import("pages/Settings/Users.vue")
      },
      {
        path: "/settings/address",
        children: [
          {
            path: "/settings/address",
            name: "settings-address",
            component: () => import("pages/Settings/Address/Address.vue")
          },
          {
            path: "/settings/address/new",
            name: "settings-address-new",
            component: () => import("pages/Settings/Address/AddressNew.vue")
          },
          {
            path: "/settings/address/update/:id",
            name: "settings-address-edit",
            component: () => import("pages/Settings/Address/AddressEdit.vue")
          }
        ]
      },
      {
        path: "/settings/inventory",
        children: [
          {
            path: "/settings/inventory",
            name: "settings-inventory",
            component: () => import("pages/Settings/Inventory/Inventory.vue")
          },
          {
            path: "/settings/inventory/new",
            name: "settings-inventory-new",
            component: () => import("pages/Settings/Inventory/InventoryNew.vue")
          },
          {
            path: "/settings/inventory/edit/:id",
            name: "settings-inventory-edit",
            component: () => import("pages/Settings/Inventory/InventoryEdit.vue")
          }
        ]
      },
      {
        path: "/settings/tag",
        name: "settings-tag",
        component: () => import("pages/Settings/Tag.vue")
      },
      {
        path: "/settings/category",
        name: "settings-category",
        component: () => import("pages/Settings/Category.vue")
      },
      {
        path: "/settings/attribut",
        name: "settings-attribut",
        component: () => import("pages/Settings/Attribut.vue")
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
