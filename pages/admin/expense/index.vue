<template>
    <div class="row">
        <div class="col-sm-6">
            <div class="white-box">
                <h3 class="box-title m-b-0">Expense Page</h3>
                <p class="text-muted m-b-30 font-13"> Enter Item Purchased </p>
                <AdminForm :product = "product" @handleAdd="addItem"/>
                
            </div>
        </div>
        <div class="col-sm-6">
            <div class="white-box">
                <h3 class="box-title">Expense Table <span style="float: right;">{{ date | date }}</span></h3>
                <Table />
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
            date: new Date(),
            product: {
                name: '',
                price: ''  
            }
            
        }
    },

    methods :{
        addItem() {
            this.$store.commit('addItem', { ...this.product}, this.product) //product is actually item
            // console.log("expense says: ", this.product)
        }
    }


}
</script>

