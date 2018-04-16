<template>
  <div class="container is-fluid">
  <div class="content notification">
    <div class="field">
      <label class="label">Name</label>
      <div class="control has-icons-left has-icons-right">
        <input class="input" type="text" v-model="name" placeholder="Name input">
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
      </div>
    </div>
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
        <button class="button is-link" @click="register">Register</button>
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
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      axios.post('http://localhost:3000/users/register', {
        name: this.name,
        email: this.email,
        password: this.password
      }).then(response => {
        swal(
          'Register success!',
          'You will go to login page',
          'success'
        ).then(() => {
          this.$router.push({path: '/'})
        })
      })
    }
  }
}
</script>

<style>

</style>
