import Vue from "vue";
import Vuex from "vuex";
import Constant from "@/Constant";
import http from "@/http-common";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todo: {},
    todoItems: [],
  },
  mutations: {
    getTodo: (state, payload) => {
      state.todo = payload.todo;
    },
    getTodoList: (state, payload) => {
      state.todoItems = payload.todoItems;
    },
    clearTodo: (state) => {
      state.todo = {};
      state.todoItems = [];
    },
  },
  actions: {
    getTodo(store, payload) {
      http
        .get(`/todolist/todo/${payload.no}`)
        .then((response) =>
          store.commit(Constant.GET_TODO, { todo: response.data })
        )
        .catch((exp) => console.log(`할일 조회를 실패했습니다. :${exp}`));
    },
    modifyTodo(store, payload) {
      http
        .put(`/todolist/todo/${payload.todo.no}`, {
          no: payload.todo.no,
          content: payload.todo.content,
          endDate: payload.todo.endDate,
        })
        .then(() => {
          console.log("수정하였습니다.");
          store.dispatch(Constant.GET_TODOLIST);
        })
        .catch((exp) => console.log(`수정을 실패했습니다.:${exp}`));
    },
    removeTodo(store, payload) {
      console.log(`removeTodo :${payload.no}`);
      http
        .delete(`/todolist/todo/${payload.no}`)
        .then(() => store.dispatch(Constant.GET_TODOLIST))
        .catch((exp) => console.log(`할일 삭제 처리를 실패했습니다.${exp}`));
    },
    getTodoList(store) {
      http
        .get("/todolist/user/java")
        .then((response) =>
          store.commit(Constant.GET_TODOLIST, { todoItems: response.data })
        )
        .catch((exp) => alert(`할일 목록 조회를 실패했습니다.${exp}`));
    },
    completeTodo(store, payload) {
      http
        .put(`/todolist/todo/done/${payload.no}`)
        .then(() => store.dispatch(Constant.GET_TODOLIST))
        .catch((exp) => console.log(`할일 완료 처리를 실패했습니다.${exp}`));
    },
    clearTodo(store) {
      http
        .delete(`/todolist/user/java`)
        .then(() => store.commit(Constant.CLEAR_TODO))
        .catch((exp) =>
          console.log(`할일 모두 삭제 처리를 실패했습니다.${exp}`)
        );
    },
    addTodo(store, payload) {
      if (payload.todo.content.trim() != "") {
        http
          .post(`/todolist/todo`, {
            content: payload.todo.content,
            endDate: payload.todo.endDate,
            userId: "java",
          })
          .then(() => {
            alert(`할일 등록에 성공했습니다.`);
            store.dispatch(Constant.GET_TODOLIST);
          })
          .catch((exp) => {
            console.log(`할일 등록을 실패했습니다.${exp}`);
          });
      }
    },
  },
});
