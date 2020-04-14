<template>
  <div class="row">
    <div class="col-sm-8">
      <Table @onAddProduct="handleAdd" />
    </div>
    <div class="col-sm-4">
      <div class="white-box">
        <h3 class="box-title m-b-0">Add New Product</h3>
        <p class="text-muted m-b-30 font-13">Enter product details below</p>
        <form class="form-horizontal">
          <div class="form-group">
            <label class="col-md-12">Product Name</label>
            <div class="col-md-12">
              <input
                type="text"
                v-model="product.name"
                class="form-control"
                placeholder="Product name"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-12" for="example-email">Product Price</label>
            <div class="col-md-12">
              <input
                v-model="product.price"
                type="number"
                id="example-email"
                name="example-email"
                class="form-control"
                placeholder="Product price"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-12" for="example-email">Product Quantity</label>
            <div class="col-md-12">
              <input
                v-model="product.quantity"
                type="number"
                id="example-email"
                name="example-email"
                class="form-control"
                placeholder="Product quantity"
              />
            </div>
          </div>
          <div class="form-group">
            <div class="col-md-12">
              <button class="btn btn-success" @click.prevent="handleAdd">ADD</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Table from "~/components/Table";
import Spreadsheet from "~/components/spread";

export default {
  layout: "dashboard",
  components: {
    Table,
    Spreadsheet
  },

  data() {
    return {
      product: {
        name: "",
        price: "",
        quantity: ""
      }
    };
  },

  methods: {
    handleAdd() {
      this.$store.dispatch("addProduct", {
        product_name: this.product.name,
        product_price: this.product.price,
        quantity: this.product.quantity,
        user_id: JSON.parse(localStorage.getItem("user")).id,
        token: localStorage.getItem("access_token")
      });

      this.product = {
        name: "",
        price: ""
      };
    },

    finish() {
      this.addProduct = false;
    }
  }
};
</script>