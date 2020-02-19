<template>
  <div class="fix-header">
    <div id="wrapper">
      <Header />
      <Sidebar />

      <div id="page-wrapper">
        <div class="container-fluid">
          <!-- <div class="row bg-title">
                    <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                        <h4 class="page-title">Starter Page</h4> </div>
                    
          </div>-->
          <!-- Router view -->
          <!-- <router-view class="beans"></router-view> -->
          <nuxt />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import Sidebar from '~/components/Sidebar'
export default {
  components: {
    Header,
    Footer,
    Sidebar
  },

  middleware: ['check-auth' ,'auth'],

  // beforeCreate () {
  //   this.$store.dispatch('initAuth')
  // }
};
</script>
<style scoped>
@import url('~/assets/bootstrap/dist/css/bootstrap.min.css');
.beans {
  margin-top: 5%;
}

#page-wrapper {
  margin-top: 0;
}
</style>