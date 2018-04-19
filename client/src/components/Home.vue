<template>
  <div class="container is-fluid">
    <div class="content notification">
      <div class="columns">
        <div class="column is-10" v-if="name">
          <h2>{{name}}'s To-Do List</h2>
        </div>
        <div class="column is-10" v-else>
          <h2>To-Do List is Empty</h2>
        </div>
        <div class="column">
          <button id="add" @click="modalActive" class="button is-primary modal-button" data-target="modal-add" aria-haspopup="true"><span><i class="fas fa-plus"></i> Add Task</span></button>
        </div>
        <!-- MODAL -->
        <div :class="modal" id="modal-add">
          <div class="modal-background" @click="modalDeactive"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">Add Task</p>
              <button class="delete" @click="modalDeactive" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
              <div class="field">
                <label class="label">Task</label>
                <div class="control has-icons-left has-icons-right">
                  <input class="input" v-model="task" type="text" placeholder="Text input">
                  <span class="icon is-small is-left">
                    <i class="fas fa-tasks"></i>
                  </span>
                </div>
              </div>
            </section>
            <footer class="modal-card-foot">
              <button @click="add" class="button is-success">Save changes</button>
              <button @click="modalDeactive" class="button">Cancel</button>
            </footer>
          </div>
          <button @click="modalDeactive" class="modal-close is-large" aria-label="close"></button>
        </div>
        <!-- MODAL -->
      </div>
      <div class="columns is-multiline">
        <div class="column is-3" v-for="todo in todoList" :key="todo">
          <div class="card">
            <div class="card-header">
              <p class="card-header-title" style="color: green;" v-if="todo.done">
                Done
                <span class="icon">
                  <i class="fas fa-check"></i>
                </span>
              </p>
              <p class="card-header-title" style="color: red;" v-else>
                Undone
                <span class="icon">
                  <i class="fas fa-times"></i>
                </span>
              </p>
            </div>
            <div class="card-content">
              <p class="title">
                {{todo.task}}
              </p>
            </div>
            <footer class="card-footer" v-if="!todo.done">
              <p class="card-footer-item">
                <a class="button is-success" style="margin: 5px" @click="done(todo)">Done</a>
                <a class="button is-danger" style="margin: 5px;" @click="del(todo)">Delete</a>
              </p>
            </footer>
            <footer class="card-footer" v-else>
              <p class="card-footer-item">
                <a class="button is-success" style="margin: 5px;" disabled>Done</a>
                <a class="button is-danger" style="margin: 5px;" @click="del(todo)">Delete</a>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'

export default {
  data () {
    return {
      modal: 'modal',
      task: '',
      todoList: [],
      name: ''
    }
  },
  beforeRouteEnter: (to, from, next) => {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      swal(
        'Login first!',
        'You must login first before enter this site',
        'error'
      ).then(() => this.$router.push({path: '/'}))
    }
  },
  created () {
    this.showAll()
  },
  methods: {
    modalActive () {
      this.modal = 'modal is-active'
    },
    modalDeactive () {
      this.modal = 'modal'
    },
    showAll () {
      axios.get('http://localhost:3000/todo', {
        headers: {token: localStorage.getItem('token')}
      }).then(response => {
        this.todoList = response.data.todo
        this.name = this.todoList[0].owner.name.split(' ')[0]
      })
    },
    add () {
      axios.post('http://localhost:3000/todo', {
        task: this.task
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      }).then(response => {
        this.task = ''
        swal(
          'Success!',
          'New task created',
          'success'
        ).then(result => {
          this.modalDeactive()
          this.showAll()
        })
      })
    },
    done (value) {
      axios.put(`http://localhost:3000/todo/${value._id}`).then(response => {
        swal(
          'Done!',
          'Your task is done!',
          'success'
        ).then(result => {
          this.showAll()
        })
      })
    },
    del (value) {
      axios.delete(`http://localhost:3000/todo/${value._id}`).then(response => {
        swal({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
            swal(
              'Deleted!',
              'Your task has been deleted.',
              'success'
            ).then(() => this.showAll())
          }
        })
      })
    }
  }
}
</script>

<style>
#add {
  vertical-align: middle !important;
}
</style>
