<template>
  <div class="navbar-default sidebar" role="navigation">
    <div class="sidebar-nav slimscrollsidebar">
      <div class="sidebar-head">
        <h3>
          <span class="fa-fw open-close">
            <i class="ti-menu hidden-xs"></i>
            <i class="ti-close visible-xs"></i>
          </span>
          <span class="hide-menu">Navigation</span>
        </h3>
      </div>
      <ul class="nav" id="side-menu">
        <li>
          <nuxt-link to="/admin" class="waves-effect">
            <i class="fa fa-folder-o fa-fw"></i>
            <span class="hide-menu">View Reports</span>
          </nuxt-link>
        </li>

        <li>
          <nuxt-link to="/admin/income" class="waves-effect">
            <i class="fa fa-pencil-square-o fa-fw"></i>
            <span class="hide-menu">Income Form</span>
          </nuxt-link>
        </li>
        <!-- <li> <a href="map-vector.html" class="waves-effect"><i class="mdi mdi-map-marker fa-fw"></i><span class="hide-menu">Vector Map</span></a> </li> -->
        <li>
          <nuxt-link to="/admin/expense" class="waves-effect">
            <i class="fa fa-pencil-square-o fa-fw"></i>
            <span class="hide-menu">Expense Form</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/admin/inventory" class="waves-effect">
            <i class="fa fa-shopping-basket fa-fw"></i>
            <span class="hide-menu">Product Inventory</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/admin/search" class="waves-effect">
            <i class="fa fa-search fa-fw"></i>
            <span class="hide-menu">Search</span>
          </nuxt-link>
        </li>

        <!-- <li><a href="login.html" class="waves-effect"><i class="mdi mdi-logout fa-fw"></i> <span class="hide-menu">Log out</span></a></li> -->
      </ul>
    </div>
  </div>
</template> 

<style scoped>
@import url("~/assets/sidebar-nav.min.css");
</style>