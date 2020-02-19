<template>
  <div>
    <Header />
    <div class="card mb-3" style="max-width: 300px; margin:10% auto;">
      <!-- <img src="../assets/img/img3.jpeg" class="card-img" alt="...">    -->
      <div class="card-body">
        <h5 class="card-title" style="padding-left: 10px;">Log In</h5>
        <form style="padding: 10px;">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              v-model="email"
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
              v-model="password"
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>

          <button type="submit" @click.prevent="login" class="btn btn-success">Submit</button>
        </form>
        <p class="card-text">
          <router-link to="/signup}">Don't have an account? Sign Up</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "~/components/Header";
// import general from "../mixins/general";
export default {
  components: {
    Header
  },

  data() {
    return {
      email: "",
      password: ""
    };
  },

  methods: {
    login() {
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password
        })
        .then(data => {
          this.$router.push("/admin");
        })
    }
  }

//   mixins: [general]
};
</script>

<style scoped>
</style>