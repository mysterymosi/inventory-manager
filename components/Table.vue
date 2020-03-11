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
      <AppButton
        style="letter-spacing: 2px;"
        type="button"
        @click="counter"
        class="btn btn-success"
      >
        <i class="fa fa-plus"></i> ADD NEW PRODUCTS
      </AppButton>
      <!-- <button @click.prevent="counter" class="btn btn-success">END OF THE DAY</button> -->
    </div>
  </div>
</template>

<script>
import AppButton from "~/components/UI/AppButton";

export default {
  components: {
    AppButton
  },

  computed: {
    products() {
      return this.$store.getters.products;
    }
  },

  methods: {
    counter() {
      this.$emit("onAddProduct");
    }
  },

  mounted() {
    this.$store.dispatch("getProducts");
  }
};
</script>