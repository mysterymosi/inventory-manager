<template>
  <div id = "body">
  <Header id="anime"></Header>
    <div class="container">
            <div class="col-lg-12">
                <div id="content">
                    <h1>The Books</h1>
                    <h3>Keep Records Make You No Fall Hands</h3>
                    <hr>
                    <nuxt-link to="/signup" class="btn btn-success btn-lg"><i class="fa fa-thumbs-up"></i> Get Started!</nuxt-link>
                </div>
            </div>
    </div>
</div>
</template>


<script>
import Header from '~/components/Header'

export default {
    components: {
        Header
    },

    layout: 'landing'
}
</script>

<style scoped>
#anime {
    opacity: 0;
    animation: fadein 1s forwards;
}

#body {
    background: url('~assets/images/img3.jpeg');
    background-size: cover;
    background-position: center;
    height: 100vh;  
}
 #content {
     text-align: center;
     padding-top: 25%;
     text-shadow: 0px 4px 3px rgba(0,0,0,0.4),
                  0px 8px 13px rgba(0,0,0,0.1),
                  0px 18px 23px rgba(0,0,0,0.1);
    opacity: 0;
    animation: slidefade 1s forwards 0.3s;
    margin-top: 50px
 }

 h1 {
     font-weight: 700;
     font-size: 5em;
 }

 hr {
     width: 400px;
     border-top: 1px solid #f8f8f8;
     border-bottom: 1px solid rgba(0,0,0,0.2);
 }

 @keyframes slidefade {
     100% {
         opacity: 1;
         margin-top: 0;
     }
 }

 @keyframes fadein {
     100% {
         opacity: 1;
     }
 }
</style>