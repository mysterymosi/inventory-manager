<template>
  <div class="white-box">
    <h3 class="box-title m-b-0" v-if="urlPath=='/admin/inventory'">PRODUCT INVENTORY</h3>
    <h3 class="box-title m-b-0" v-else-if="urlPath=='/admin/income'">TODAY'S LOG</h3>

    <h3 class="box-title m-b-0" v-else>EXPENSE FORM</h3>

    <div class="table-responsive">
      <table
        v-if="urlPath=='/admin/inventory'||urlPath=='/admin/income'"
        class="table color-bordered-table success-bordered-table"
      >
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody v-if="path">
          <tr v-for="(product, j) in products" :key="j">
            <!-- <tr> -->

            <td>{{ product.prodname }}</td>
            <td>{{ product.prodprice }}</td>
            <td>{{ product.prodquan }}</td>
            <td>
              <nuxt-link :to="{path: '/admin/inventory/' + product.id + '/edit'}">
                <i style="color: grey;" class="fa fa-pencil"></i>
              </nuxt-link>
              <span @click="deleteProduct(product.id)">
                <i class="fa fa-trash"></i>
              </span>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr v-for="(product, j) in sales" :key="j">
            <!-- <tr> -->

            <td>{{ product.prod_name }}</td>
            <td>{{ product.sales_price }}</td>
            <td>{{ product.quantity }}</td>
            <td>
              <nuxt-link :to="{path: '/admin/inventory/' + product.id + '/edit'}">
                <i style="color: grey;" class="fa fa-pencil"></i>
              </nuxt-link>
              <span @click="deleteProduct(product.id)">
                <i class="fa fa-trash"></i>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <table v-else class="table table-bordered color-bordered-table success-bordered-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <!-- <th></th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, j) in 15" :key="j">
            <!-- <tr> -->
            <td>
              <input v-model="item[j].name" type="text" />
            </td>
            <td>
              <input v-model="item[j].price" type="number" />
            </td>
            <td>
              <input v-model="item[j].quantity" type="number" />
            </td>
            <!-- <td>
              <nuxt-link :to="{path: '/admin/inventory/' + product.id + '/edit'}">
                <i style="color: grey;" class="fa fa-pencil"></i>
              </nuxt-link>
              <span @click="deleteProduct(product.id)">
                <i class="fa fa-trash"></i>
              </span>
            </td>-->
          </tr>
        </tbody>
        <!-- <tbody v-else>
          <tr v-for="(product, j) in sales" :key="j">

            <td>{{ product.prod_name }}</td>
            <td>{{ product.sales_price }}</td>
            <td>{{ product.quantity }}</td>
            <td>
              <nuxt-link :to="{path: '/admin/inventory/' + product.id + '/edit'}">
                <i style="color: grey;" class="fa fa-pencil"></i>
              </nuxt-link>
              <span @click="deleteProduct(product.id)">
                <i class="fa fa-trash"></i>
              </span>
            </td>
          </tr>
        </tbody>-->
      </table>
      <AppButton @click="handleAdd" v-if="urlPath=='/admin/income'">
        <i style="margin-left: 0;" class="fa fa-plus"></i> ADD NEW SALES
      </AppButton>
      <AppButton
        style="float: right; letter-spacing: 5px;"
        @click="submit"
        v-if="urlPath=='/admin/expense'"
      >SUBMIT</AppButton>
    </div>
  </div>
</template>

<script>
import AppButton from "~/components/UI/AppButton";

export default {
  components: {
    AppButton
  },

  data() {
    return {
      quantities: [],
      urlPath: this.$route.path,
      item: []
    };
  },

  computed: {
    products() {
      return this.$store.getters.products;
    },

    sales() {
      return this.$store.getters.sales;
    },

    path() {
      if (this.$route.path == "/admin/inventory") return true;
      return false;
    }
  },

  // mounted() {
  //   if (this.$route.path == "/admin/inventory") {
  //     this.$store.dispatch("getProducts").then(() => {
  //       console.log("getproducts successful");
  //     });
  //   }
  // },
  methods: {
    handleAdd() {
      this.$emit("onAddSale");
      console.log("Submitted");
    },

    deleteProduct(prodId) {
      this.$store.commit("deleteProduct", prodId);
    },

    submit() {
      localStorage.setItem("expense", JSON.stringify([]));

      console.log("submitted");
      let items = JSON.parse(localStorage.getItem("expense"));
      for (let i = 0; i < this.item.length; i++) {
        if (
          this.item[i].name.length > 0 &&
          this.item[i].price.length > 0 &&
          this.item[i].quantity.length > 0
        ) {
          let obj = {
            name: this.item[i].name,
            price: this.item[i].price,
            quantity: this.item[i].quantity
          };
          items.push(obj);
          // this.$store.commit("addExpense", {
          //   name: this.item[i].name,
          //   price: this.item[i].price,
          //   quantity: this.item[i].quantity
          // });
        }
      }
      this.$store.commit("addExpense", items);
      // if (field.length > 0) {

      // }
    },

    //on change, set the value of quantity to the value in the input field
    pushQ(i) {
      this.quantities[i].quantity = $("#" + i).val();
    }
  },

  beforeMount() {
    let obj = {};

    for (let i = 0; i < 20; i++) {
      obj = {
        name: "",
        price: "",
        quantity: ""
      };
      this.item.push(obj);
    }
  }

  // beforeMount() {
  //   console.log("this is the created");

  //   // this.$store.dispatch("getProducts").then(() => {
  //   let obj = {};
  //   //pushing an object into the quantities array
  //   for (let i = 0; i < this.products.length; i++) {
  //     // let field = $("#" + i).val;
  //     // if (field.length > 0) {
  //     obj = {
  //       id: this.products[i].id,
  //       quantity: ""
  //     };
  //     this.quantities.push(obj);
  //     obj = {};
  //     // }
  //   }
  //   // });
  // }
};
</script>

<style scoped>
i {
  margin-left: 20px;
}
i:hover {
  cursor: pointer;
}

input {
  outline: none;
  border: none;
  /* width: 200px; */
  /* height: 80px; */
}
</style>