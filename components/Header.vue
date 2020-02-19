<template>
   <nav class="navbar navbar-expand-lg navbar-light bg-light">
       <div class="container">
           <nuxt-link class="navbar-brand" to="/"><i class="fa fa-btc"></i> The Books</nuxt-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <nuxt-link class="nav-link" to="/"><i class="fa fa-home"></i> Home <span class="sr-only">(current)</span></nuxt-link>
      </li>
      <li class="nav-item" v-if="profile.email">
        <nuxt-link class="nav-link" to="/admin"><i class="fa fa-user"></i> My Account</nuxt-link>
      </li>

      <!-- <li class="nav-item">
        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
      </li> -->
    </ul>
    <!-- <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form> -->

    <ul class="navbar-nav" v-if="!profile.email">
        <li class="nav-item">
            <nuxt-link class="nav-link" to="/signup"><i class="fa fa-user-plus"></i> Signup</nuxt-link>
        </li>
        <li class="nav-item">
            <nuxt-link class="nav-link" to="/login"><i class="fa fa-sign-in"></i> Login</nuxt-link>
        </li>
    </ul>

    <ul class="navbar-nav" v-else>
        <li class="nav-item">
          <span style="margin-top: 10px;">{{ profile.firstName }} {{ profile.lastName }}</span>
        </li>
        <li class="nav-item">
            <button class="nav-link" @click="logout"><i class="fa fa-sign-in"></i> Logout</button>
        </li>
    </ul>

  </div> 
       </div>
  
</nav>
</template>

<script>
const Cookie = process.client? require('js-cookie'): undefined

export default {
  computed: {
    profile () {
      return this.$store.getters.profile
    }
  },

  created () {
    console.log('profile says', this.$store.getters.profile)
  },

  methods: {
    logout () {
      localStorage.removeItem('access_token')
      localStorage.removeItem('user_email')
      this.$store.commit('setProfile', {})
      Cookie.remove('access_token')
      Cookie.remove('user')
      this.$store.commit('setToken', null)
      console.log("logout profile :", this.profile)
      this.$router.push('/')
    }
  }
    
}
</script>

<style scoped>
.fa-btc {
    padding-top: 1.2em;
}

.bg-light {
    margin-bottom: 0;
}
</style>