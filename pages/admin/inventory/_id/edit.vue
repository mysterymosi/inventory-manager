<template>
  <div class="row">
    <div class="col-sm-2"></div>
    <div class="col-sm-8">
      <div class="white-box">
        <h3 class="box-title m-b-0">Edit Product</h3>
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
              <button class="btn btn-success" @click.prevent="handleEdit">EDIT</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="col-sm-2"></div>
  </div>
</template>

<script>
export default {
  layout: "dashboard",
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
    handleEdit() {
      let product = {
        id: this.$route.params.id,
        prodname: this.product.name,
        prodprice: this.product.price,
        prodquan: this.product.quantity
      };
      this.$store.commit("editProduct", product);
      this.$router.replace("/admin/inventory");
    }
  },

  computed: {
    singleProduct() {
      let prodId = this.$route.params.id;
      return this.$store.getters.product(prodId);
    }
  },

  mounted() {
    this.product.name = this.singleProduct.prodname;
    this.product.price = this.singleProduct.prodprice;
    this.product.quantity = this.singleProduct.prodquan;
  }
};
</script>