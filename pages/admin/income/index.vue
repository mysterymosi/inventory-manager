<template>
    <div class="row">
        <div class="col-sm-6">
            <div class="white-box">
                <h3 class="box-title m-b-0">Income Page</h3>
                <p class="text-muted m-b-30 font-13"> Enter Product Sold </p>
                <AdminForm :product = "product" @handleAdd="addProducts"/>
                
            </div>
        </div>
        <div class="col-sm-6">
            <div class="white-box">
                <h3 class="box-title">Income Table <span style="float: right;">{{ date | dateFilter }}</span></h3>
                <Table @onEndTheDay="handleEndTheDay"/>
            </div>
        </div>
        
    </div> 
</template>

<script>
import AdminForm from '~/components/AdminForm'
import Table from '~/components/Table'

export default {
    layout: 'dashboard',
    components: {
        AdminForm,
        Table
    },

    data () {
        return {
            date: new Date().toDateString(),
            product: {
                name: '',
                price: ''  
            }
            
        }
    },

    methods :{
        addProducts() {
            this.$store.dispatch('addProduct', {
                prodname: this.product.name,
                prodprice: this.product.price
            })
            // console.log("expense says: ", this.product)
        },

        handleEndTheDay () {
            console.log("The day has ended")
            this.$store.commit('endTheDay', this.date)
        }
    }


}
</script>

