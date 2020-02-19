<template>
  <div>
    <Header />
    <div class="card mb-3" style="max-width: 300px; margin:10% auto;">
      <!-- <img src="../assets/img/img3.jpeg" class="card-img" alt="...">    -->
      <div class="card-body">
        <h5 class="card-title" style="padding-left: 10px;">Sign Up</h5>
        <form style="padding: 10px;">
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input
              v-model="userData.firstName"
              type="text"
              class="form-control"
              id="firstName"
              aria-describedby="emailHelp"
              placeholder="Enter First Name"
            />
          </div>
          <div class="form-group">
            <label for="LastName">Last Name</label>
            <input
              v-model="userData.lastName"
              type="text"
              class="form-control"
              id="LastName"
              aria-describedby="emailHelp"
              placeholder="Enter Last Name"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              v-model="userData.email"
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <small
              id="emailHelp"
              class="form-text text-muted"
            >We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              v-model="userData.password"
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>

          <button type="submit" @click.prevent="signup" class="btn btn-success">Submit</button>
        </form>
        <p class="card-text">
          <router-link to="/login">Already have an account? Log in</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "~/components/Header";
export default {
  components: {
    Header
  },

  data () {
    return {
      userData: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      }
    }
  },

  methods: {
    signup () {
      let info = {
        firstname: this.userData['firstName'],
        lastname: this.userData['lastName'],
        email: this.userData['email'],
        password: this.userData['password']
      } 

      this.$store.dispatch('signup', info)
      .then ((data) => {
        console.log(`Response: ${JSON.stringify(data)}`)
        this.$router.push('Login')
      }).catch((err)=>{
        console.log(`Error from signup: ${err}`)
      })
    }
  }
};
</script>

<style scoped>
</style>