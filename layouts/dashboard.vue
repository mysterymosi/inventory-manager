<template>
  <div class="fix-header">
    <div id="wrapper">
      <NewHeader />
      <Sidebar />

      <div id="page-wrapper">
        <div class="container-fluid">
          <!-- <div class="row bg-title">
                    <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                        <h4 class="page-title">Starter Page</h4> </div>
                    
          </div>-->
          <!-- Router view -->
          <!-- <router-view class="beans"></router-view> -->
          <nuxt class="beans" />
        </div>
      </div>
    </div>
    <Footer />
    <!-- <VueInjectJs src="/static/jquery/dist/jquery.min.js" />
    <VueInjectJs src="~/assets/bootstrap/dist/js/bootstrap.min.js" />
    <VueInjectJs src="/static/js/jquery.slimscroll.js" />
    <VueInjectJs src="/static/js/waves.js" />
    <VueInjectJs src="/static/js/custom.min.js" />
    <VueInjectJs src="/static/js/jquery.slimscroll.js" />-->
  </div>
</template>

<script>
import NewHeader from "~/components/NewHeader";
import Footer from "~/components/Footer";
import Sidebar from "~/components/Sidebar";

export default {
  components: {
    NewHeader,
    Footer,
    Sidebar
  },

  head: {
    script: [
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.js"
      },
      { src: "js/bootstrap.min.js" },
      { src: "js/jquery.slimscroll.js" },
      { src: "js/waves.js" },
      { src: "js/custom.min.js" }
    ]
  },

  middleware: ["check-auth", "auth"]

  // beforeCreate () {
  //   this.$store.dispatch('initAuth')
  // }
};
</script>
<style scoped>
@import url("~/assets/bootstrap/dist/css/bootstrap.min.css");

.beans {
  margin-top: 7%;
}

#page-wrapper {
  margin-top: 0;
}

.container-fluid {
  margin-top: 0px;
}

.navbar-static-top {
  padding-left: 60px;
}
</style>