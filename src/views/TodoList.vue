<template>
  <div>
    <ul>
      <li
        v-for="todoItem in todoItems"
        :key="todoItem.no"
        class="shadow"
        :class="{ done: todoItem.done == 'Y' }"
        @click="getTodo(todoItem.no)"
      >
        <i
          class="fas fa-check checkBtn"
          @click.stop="completeTodo(todoItem.no)"
          v-show="todoItem.done == 'N'"
        ></i>
        {{ todoItem.content }} : {{ todoItem.endDate }}
        <i
          class="fas fa-trash-alt removeBtn"
          @click.stop="removeTodo(todoItem.no)"
        ></i>
      </li>
    </ul>
    <div class="clearAllContainer">
      <span class="clearAllBtn" @click="clearTodo">Clear All</span>
    </div>
  </div>
</template>

<script>
import http from "@/http-common";
import Constant from "@/Constant";
export default {
  computed: {
    todoItems() {
      return this.$store.state.todoItems;
    },
  },
  created() {
    this.getTodoList();
  },
  methods: {
    removeTodo(no) {
      console.log(`removeTodo :${no}`);
      this.$store.dispatch(Constant.REMOVE_TODO, { no });
    },
    getTodoList() {
      this.$store.dispatch(Constant.GET_TODOLIST);
    },
    completeTodo(no) {
      console.log(`completeTodo :${no}`);
      this.$store.dispatch(Constant.COMPLETE_TODO, { no });
    },
    clearTodo() {
      this.$store.dispatch(Constant.CLEAR_TODO);
    },
    getTodo(no) {
      this.$router.push(`/detail/${no}`);
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.removeBtn {
  line-height: 45px;
  color: #de4343;
  margin-left: auto;
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-move {
  transition: transform 1s;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.done {
  background-color: lightslategray;
}
.clearAllContainer {
  width: 8.5rem;
  height: 50px;
  line-height: 50px;
  background-color: white;
  border-radius: 5px;
  margin: 0 auto;
}
.clearAllBtn {
  color: #e20303;
  display: block;
}
</style>
