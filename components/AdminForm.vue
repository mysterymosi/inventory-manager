<template>
    <div>
        <form>
            <AppControlInput controlType='input' v-model="product.name" placeholder="Product">Product name</AppControlInput>
            <AppControlInput controlType='input' v-model="product.price" placeholder="Price">Product price</AppControlInput>
            <AppButton
            type="submit"
            class="btn btn-success"
            @click.prevent="onAdd"
        >ADD</AppButton>
        </form>
        
    </div>
</template>

<script>
import AppControlInput from '~/components/UI/AppControlInput'
import AppButton from '~/components/UI/AppButton'
export default {
    layout: 'dashboard',
    components: {
        AppControlInput,
        AppButton
    },

    props: {
        product: {
            type: Object,
            required: false
        }
    },

    data () {
        return {
            // loadedProducts: this.product
        }
    },

    methods: {
        onAdd () {
            this.$emit('handleAdd')
        }
    }
}
</script>

<style scoped>
    button {
        letter-spacing: 2px;
    }
</style>