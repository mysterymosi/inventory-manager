<template>
  <div>
    <div class="row">
      <div v-if="showLog" class="col-sm-8">
        <Table @onAddSale="showLog=false" />
      </div>
      <div v-if="!showLog" class="col-sm-8">
        <div class="white-box">
          <h3 class="box-title m-b-0">Enter Sales</h3>
          <p class="text-muted m-b-30 font-13">Enter product details below</p>
          <form class="form-horizontal">
            <div class="form-group">
              <label class="col-md-12">Product Name</label>
              <div class="col-md-12">
                <input v-model="product.name" autocomplete="on" list="prods" class="form-control" />
                <datalist id="prods">
                  <option v-for="(product, i) in products" :key="i">{{ product.prodname }}</option>
                </datalist>
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
            <div class="form-group" v-show="showprice">
              <label class="col-md-12" for="example-email">Product Price</label>
              <div class="col-md-12">
                <input
                  disabled
                  v-model="product.price"
                  type="number"
                  id="example-email"
                  name="example-email"
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-12">
                <button type="button" class="btn btn-success" @click.prevent="handleAdd">ADD</button>
              </div>
            </div>
            <div class="form-group">
              <div class="col-md-12">
                <button
                  type="button"
                  class="btn btn-success"
                  @click.prevent="showLog = true"
                >VIEW SALES LOG</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="card col-sm-4">
        <div class="white-box">
          <h1 class="box-title">Total Expenses</h1>
          <h4 class="card-text">
            <b>$</b>
            {{ dailyProductSum[formattedDate] }}
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Table from "~/components/Table";

export default {
  layout: "dashboard",
  components: {
    Table
  },
  data() {
    return {
      product: {
        prod_id: "",
        name: "",
        price: "",
        quantity: ""
      },
      showLog: false,
      showprice: false,
      date: new Date().toDateString()
    };
  },

  updated() {
    if (this.product.quantity.length > 0) {
      for (let i = 0; i < this.products.length; i++) {
        if (this.product.name === this.products[i].prodname) {
          this.product.price =
            +this.product.quantity * this.products[i].prodprice;
          this.product.prod_id = this.products[i].id;
        }
      }
      this.showprice = true;
    }
  },
  computed: {
    dailyProductSum() {
      return this.$store.getters.dailyProductSum;
    },

    sortedProducts() {
      return this.$store.getters.sortedProducts(this.formattedDate);
    },

    products() {
      return this.$store.getters.products;
    },

    profile() {
      return this.$store.getters.profile;
    },

    formattedDate() {
      let date = new Date();
      let formattedDate = ("0" + date.getDate()).slice(-2);
      let month = date.getMonth() + 1;
      let formattedMonth = ("0" + month).slice(-2);
      console.log(
        "date says: ",
        date.getFullYear() + "-" + formattedMonth + "-" + formattedDate
      );
      let finalDate =
        date.getFullYear() + "-" + formattedMonth + "-" + formattedDate;
      return finalDate;
    }
  },

  methods: {
    endTheDay() {
      this.$store.commit("endTheDay", this.date);
    },

    ...mapActions({ getSales: "getTodaySales" }),

    handleAdd() {
      this.$store.dispatch("addSales", {
        product_id: this.product.prod_id,
        product_name: this.product.name,
        quantity: this.product.quantity,
        price: this.product.price,
        user_id: this.profile.id
        // token: localStorage.getItem("access_token")
      });

      this.product = {
        prod_id: "",
        name: "",
        quantity: "",
        price: ""
      };

      this.showprice = false;
    }
  }
};
</script>

<style scoped>
</style>
