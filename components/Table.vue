<template>
    <div class="table-responsive">
        <table class="table color-bordered-table success-bordered-table">
            <thead>
                <tr>
                    <th>Item Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                    <tr v-for="(product, j) in products" :key="j">
                        <!-- <tr> -->
                        <td>{{ product.prodname }}</td>
                        <td>{{ product.prodprice }}</td>
                    </tr>
                
            </tbody>
            
        </table>
        <div class="input-group m-b-30" style="margin-top: 20px;">
            <AppButton type="button" @click="counter" class="btn btn-success">END OF THE DAY</AppButton>
            <!-- <button @click.prevent="counter" class="btn btn-success">END OF THE DAY</button> -->
        </div>
    </div>
</template>

<script>
import AppButton from '~/components/UI/AppButton'

export default {
    components: {
        AppButton
    },
    

    computed: {
        products () {
            let path = this.$route.path
            if(path === '/admin/expense') {
                return this.$store.getters.items
            } else if(path === '/admin/income') {
                return this.$store.getters.products
            }
        }
    },

    methods: {
        counter () {
            this.$emit('onEndTheDay')
        }
    }
}
</script>