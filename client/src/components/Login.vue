<template>
  <div class="container is-fluid">
  <div class="content notification">
    <div class="field">
      <label class="label">Email</label>
      <div class="control has-icons-left has-icons-right">
        <input class="input" type="email" v-model="email" placeholder="Email input">
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
      </div>
    </div>
    <div class="field">
      <label class="label">Password</label>
      <div class="control has-icons-left has-icons-right">
        <input class="input" type="password" v-model="password" placeholder="Password input">
        <span class="icon is-small is-left">
          <i class="fas fa-key"></i>
        </span>
      </div>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" @click="login">Login</button>
      </div>
    </div>
    <div class="field">
      <span>Doesn't have account? Register <router-link :to="{path: '/register'}">here</router-link></span>
    </div>
  </div>
  </div>
</template>

<script>
import swal from 'sweetalert2'
import axios from 'axios'
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      axios.post('http://server-todo.fachrizal.com/users/login', {
        email: this.email,
        password: this.password
      }).then(response => {
        swal(
          'Login success!',
          'You are logged in',
          'success'
        ).then(() => {
          localStorage.setItem('token', response.data.token)
          this.$router.push({path: '/home'})
          // location.reload()
        })
      })
    }
  }
}
</script>

<style>

</style>
