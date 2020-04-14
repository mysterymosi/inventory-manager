<template>
  <nav class="navbar navbar-default navbar-static-top m-b-0">
    <div class="navbar-header">
      <div class="top-left-part">
        <!-- Logo -->
        <nuxt-link class="logo" to="/">
          <!-- Logo icon image, you can use font-icon also -->
          <b>
            <!-- This is dark logo icon -->
            <img src="~/assets/images/admin-logo.png" alt="home" class="dark-logo" />
            <!-- This is light logo icon -->
            <img src="~/assets/images/admin-logo-dark.png" alt="home" class="light-logo" />
          </b>
          <!-- Logo text image you can use text also -->
          <span class="hidden-xs">
            <!--This is dark logo text-->
            <!-- <i class="fa fa-btc"></i> -->
            <strong style="color: #2f323e">The Books</strong>
          </span>
        </nuxt-link>
      </div>
      <!-- /Logo -->
      <!-- Search input and Toggle icon -->
      <ul class="nav navbar-top-links navbar-left">
        <li>
          <a href="javascript:void(0)" class="open-close waves-effect waves-light visible-xs">
            <i class="ti-close ti-menu"></i>
          </a>
        </li>
        <li class="dropdown">
          <nuxt-link class="dropdown-toggle waves-effect waves-light" data-toggle="dropdown" to="/">
            <i class="mdi mdi-home"></i>
            <span>Home</span>
          </nuxt-link>
        </li>

        <!-- .Task dropdown -->
        <li class="dropdown" v-if="profile.email">
          <nuxt-link
            class="dropdown-toggle waves-effect waves-light"
            data-toggle="dropdown"
            to="/admin"
          >
            <i class="mdi mdi-account"></i>
            <span>Account</span>
          </nuxt-link>
        </li>
        <!-- .Megamenu -->

        <!-- /.Megamenu -->
      </ul>
      <ul class="nav navbar-top-links navbar-right pull-right" v-if="!profile.email">
        <li class="dropdown">
          <nuxt-link
            class="dropdown-toggle waves-effect waves-light"
            data-toggle="dropdown"
            to="/signup"
          >
            <i class="mdi mdi-account"></i>
            <span>Signup</span>
          </nuxt-link>
        </li>
        <li class="dropdown">
          <nuxt-link
            class="dropdown-toggle waves-effect waves-light"
            data-toggle="dropdown"
            to="/login"
          >
            <i class="mdi mdi-account"></i>
            <span>Login</span>
          </nuxt-link>
        </li>
      </ul>
      <ul class="nav navbar-top-links navbar-right pull-right" v-else>
        <li class="dropdown">
          <a class="dropdown-toggle profile-pic" data-toggle="dropdown" href="javascript:void(0)">
            <img src="~assets/images/users/varun.jpg" alt="user-img" width="36" class="img-circle" />
            <b class="hidden-xs">{{ profile.name.charAt(0).toUpperCase() + profile.name.slice(1) }}</b>
            <span class="caret"></span>
          </a>
          <ul class="dropdown-menu dropdown-user animated flipInY">
            <li>
              <div class="dw-user-box">
                <div class="u-img">
                  <img src="~assets/images/users/varun.jpg" alt="user" />
                </div>
                <div class="u-text">
                  <h4>{{ profile.name.charAt(0).toUpperCase() + profile.name.slice(1) }}</h4>
                  <p class="text-muted">{{ profile.email }}</p>
                  <a href="profile.html" class="btn btn-rounded btn-danger btn-sm">View Profile</a>
                </div>
              </div>
            </li>
            <li role="separator" class="divider"></li>
            <li>
              <a href="javascript:void(0)">
                <i class="ti-user"></i> My Profile
              </a>
            </li>
            <li>
              <a href="javascript:void(0)">
                <i class="ti-wallet"></i> My Balance
              </a>
            </li>
            <li>
              <a href="javascript:void(0)">
                <i class="ti-email"></i> Inbox
              </a>
            </li>
            <li role="separator" class="divider"></li>
            <li>
              <a href="javascript:void(0)">
                <i class="ti-settings"></i> Account Setting
              </a>
            </li>
            <li role="separator" class="divider"></li>
            <li>
              <a @click.prevent="logout" href="javascript:void(0)">
                <i class="fa fa-power-off"></i> Logout
              </a>
            </li>
          </ul>
          <!-- /.dropdown-user -->
        </li>
        <!-- /.dropdown -->
      </ul>
    </div>

    <!-- /.navbar-header -->
    <!-- /.navbar-top-links -->
    <!-- /.navbar-static-side -->
  </nav>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  computed: {
    profile() {
      return this.$store.getters.profile;
    }
  },

  created() {
    console.log("profile says", this.$store.getters.profile);
  },

  methods: {
    logout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_email");
      this.$store.commit("setProfile", {});
      Cookie.remove("access_token");
      Cookie.remove("user");
      this.$store.commit("setToken", null);
      console.log("logout profile :", this.profile);
      this.$router.push("/");
    }
  }
};
</script>