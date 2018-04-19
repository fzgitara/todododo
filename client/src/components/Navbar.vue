<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link to="/">
        <a class="navbar-item">
          <img src="../assets/logo.png" height="28"> <strong>Todododo</strong>
        </a>
      </router-link>
    </div>
    <div class="navbar-menu" v-show="token!=null">
      <div class="navbar-end">
        <div class="navbar-item">
          <button class="button is-outlined" @click="logout">Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import swal from 'sweetalert2'
export default {
  data () {
    return {
      token: localStorage.getItem('token')
    }
  },
  methods: {
    logout () {
      swal({
        title: 'Are you sure?',
        text: 'You will logout from this site',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Logout'
      }).then((result) => {
        if (result.value) {
          swal(
            'Logout!',
            'You are logged out',
            'success'
          ).then(() => {
            localStorage.removeItem('token')
            this.$router.push({path: '/'})
            location.reload()
          })
        }
      })
    }
  }
}
</script>

<style>

</style>
