<template>
  <div>
    <Header />
    <div class="card mb-3" style="max-width: 300px; margin:2% auto;">
      <!-- <img src="../assets/img/img3.jpeg" class="card-img" alt="...">    -->
      <div class="card-body">
        <h5 class="card-title" style="padding-left: 10px;">Sign Up</h5>
        <form style="padding: 10px;">
          <div class="form-group">
            <label for="firstName">Name</label>
            <input
              v-model="userData.name"
              type="text"
              class="form-control"
              id="firstName"
              aria-describedby="emailHelp"
              placeholder="Enter Name"
            />
          </div>
          <!-- <div class="form-group">
            <label for="LastName">Last Name</label>
            <input
              v-model="userData.lastName"
              type="text"
              class="form-control"
              id="LastName"
              aria-describedby="emailHelp"
              placeholder="Enter Last Name"
            />
          </div>-->
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
          <div class="form-group">
            <label for="exampleInputPassword2">Confirm Password</label>
            <input
              v-model="userData.confirm_pass"
              type="password"
              class="form-control"
              id="exampleInputPassword2"
              placeholder="Confirm Password"
            />
          </div>

          <button type="submit" @click.prevent="signup" class="btn btn-success">Submit</button>
        </form>
        <p class="card-text">
          <nuxt-link to="/login">Already have an account? Log in</nuxt-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "~/components/NewHeader";
export default {
  components: {
    Header
  },

  data() {
    return {
      userData: {
        name: "",
        email: "",
        password: "",
        confirm_pass: ""
      }
    };
  },

  methods: {
    signup() {
      let info = {
        name: this.userData["name"],
        email: this.userData["email"],
        password: this.userData["password"],
        confirm_pass: this.userData["confirm_pass"]
      };

      this.$store
        .dispatch("signup", info)
        .then(data => {
          if (data.status) {
            console.log(`Response: ${JSON.stringify(data)}`);
            this.$router.push("Login");
          } else {
            for (let i in data.error) {
              console.log(data.error[i].toString());
            }
          }
        })
        .catch(err => {
          console.log(`Error from signup: ${err}`);
        });
    }
  }
};
</script>

<style scoped>
</style>