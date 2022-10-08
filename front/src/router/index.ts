import { route } from "quasar/wrappers";
import { UserActionTypes } from "src/store/user/action-types";
import { OrganizationActionTypes } from "src/store/organization/action-types";
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import { useMutation } from "@vue/apollo-composable"
import { StateInterface } from "../store";
import routes from "./routes";
import { User } from "app/../commons/Interface/User";
import { Organization } from "app/../commons/Interface/Organization";
import gql from "graphql-tag";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route<StateInterface>(({ store }) => {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === "history" ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });

  Router.beforeEach((to, from, next) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (to.matched.some(record => record.meta.requireAuth) && !store.getters["user/user"]) {
      const token = localStorage.getItem("token");
      if (!token) {
        next({ name: "login" });
        return;
      }
      const { mutate: me  } = useMutation(gql`
        mutation me  {
          me {
            user {
              email
              firstname
              id
              lastname
              phone
              role
              status
            }
            organization {
              id
              name
            }
          }
        }
      `)

      me()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore 
        .then((
          {
            data
          } : {
            data: {
              me :{
                user: User;
                organization: Organization;
              }
          }
        }) => {
          void store.dispatch(`user/${UserActionTypes.SET_USER}`, data.me.user)
          void store.dispatch(`organization/${OrganizationActionTypes.SET_ORGANIZATION}`, data.me.organization)
          next();
        })
        .catch(() => {
          next({ name: "login" })
        })
    } else {
      next()
    }
  })

  return Router;
});
