<template>
  <div>
    <table>
      <tbody>
        <tr>
          <td>번호</td>
          <td>
            <input type="text" v-model="todo.no" readonly class="inputBox" />
          </td>
        </tr>
        <tr>
          <td>할일</td>
          <td>
            <input type="text" v-model="todo.content" class="inputBox" />
          </td>
        </tr>
        <tr>
          <td>등록일</td>
          <td>
            <input
              type="text"
              v-model="todo.writeDate"
              readonly
              class="inputBox"
            />
          </td>
        </tr>
        <tr>
          <td>기한</td>
          <td><input type="date" v-model="todo.endDate" class="inputBox" /></td>
        </tr>
        <tr>
          <td>완료여부</td>
          <td>
            <span v-if="todo.done == 'Y'">완료</span>
            <span v-else>미완료</span>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <span class="addContainer" @click="modifyTodo">
              <i class="fas fa-check-circle checkBtn"></i>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// import http from "@/http-common";
import Constant from "@/Constant";
export default {
  data() {
    return {
      todo: {
        no: 0,
        content: "",
        userId: "",
        endDate: "",
        writeDate: "",
        done: "",
      },
    };
  },
  computed: {
    ctodo() {
      return this.$store.state.todo;
    },
  },
  watch: {
    ctodo(newTodo) {
      this.todo.no = newTodo.no;
      this.todo.content = newTodo.content;
      this.todo.writeDate = newTodo.writeDate;
      this.todo.endDate = newTodo.endDate;
      this.todo.done = newTodo.done;
    },
  },
  created() {
    this.getTodo(this.$route.params.no);
  },
  methods: {
    getTodo(no) {
      this.$store.dispatch(Constant.GET_TODO, { no });
    },
    modifyTodo() {
      this.$store.dispatch(Constant.MODIFY_TODO, {
        todo: {
          no: this.todo.no,
          content: this.todo.content,
          endDate: this.todo.endDate,
        },
      });
      this.$router.push("/list");
    },
  },
};
</script>

<style scoped>
input:focus {
  outline: none;
}
.inputBox {
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
  width: 95%; /* add */
}
.inputBox input {
  border-style: none;
  font-size: 0.9rem;
}

.addContainer {
  background: linear-gradient(to right, #647811, #527810);
  display: inline-block;
  width: 3rem;
  border-radius: 5px 5px 5px 5px;
}
.checkBtn {
  color: white;
  vertical-align: middle;
}

table {
  width: 40%;
  margin: 10px auto;
  border-collapse: collapse;
  border: 2px solid #996;
  font: normal 90%/140% verdana, arial, helvetica, sans-serif;
  color: #333;
  background: #fffff0;
}

.caption {
  background-color: #222;
  vertical-align: middle;
  text-align: center;
  padding: 15px;
  font-size: 20px;
  color: #fff;
}

td,
th {
  border: 1px solid #cc9;
  padding: 0.3em;
}
thead th,
tfoot th {
  background-color: "#f5deb3";
  border: 1px solid #cc9;
  text-align: center;
  font-size: 1em;
  font-weight: bold;
  color: #444;
  background: #dbd9c0;
}
tbody td a {
  background: transparent;
  color: #72724c;
  text-decoration: none;
  border-bottom: 1px dotted #cc9;
}
tbody td a:hover {
  background: transparent;
  color: #666;
  border-bottom: 1px dotted #72724c;
}
tbody th a {
  background: transparent;
  color: #72724c;
  text-decoration: none;
  font-weight: bold;
  border-bottom: 1px dotted #cc9;
}
tbody th a:hover {
  background: transparent;
  color: #666;
  border-bottom: 1px dotted #72724c;
}
tbody th,
tbody td {
  vertical-align: top;
  text-align: center;
}
tfoot td {
  border: 1px solid #996;
}
.odd {
  color: #333;
  background: #f7f5dc;
}
tbody tr:hover {
  color: #333;
  background: #fff;
}
tbody tr:hover th,
tbody tr.odd:hover th {
  color: #333;
  background: #ddd59b;
}
tbody tr {
  height: 50px;
  line-height: 50px;
}
</style>
