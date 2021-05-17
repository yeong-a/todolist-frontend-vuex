import Vue from "vue";
import VueRouter from "vue-router";
import TodoList from "@/views/TodoList.vue";
import TodoInput from "@/views/TodoInput.vue";
import TodoDetail from "@/views/TodoDetail.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: TodoList,
  },
  {
    path: "/list",
    name: "TodoList",
    component: TodoList,
  },
  {
    path: "/input",
    name: "TodoInput",
    component: TodoInput,
  },
  {
    path: "/detail/:no",
    name: "TodoDetail",
    component: TodoDetail,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
