<template>
  <div>
    <SpreadSheet
      class="col-lg-8 col-md-8"
      ref="spreadsheet"
      :toolbar="toolbar"
      :editLine="editLine"
      :rowsCount="rowsCount"
      :colsCount="colsCount"
      :menu="menu"
      @onEndDay="endTheDay"
    />
    <div class="card col-lg-4 col-md-4">
      <div class="card-body">
        <h1 class="card-title">Total Expenses</h1>
        <h4 class="card-text">
          <b>$</b>
          {{ dailyProductSum[formattedDate] }}
        </h4>
        <!-- <AppButton>Go Somewhere</AppButton> -->
      </div>
    </div>
  </div>
</template>

<script>
import SpreadSheet from "~/components/spread";
import { inputData } from "~/assets/js/util.js";

export default {
  layout: "dashboard",
  components: {
    SpreadSheet
  },
  data() {
    return {
      toolbar: ["rows", "columns", "lock"],
      editLine: true,
      colsCount: 10,
      rowsCount: 20,
      menu: true,
      date: new Date().toDateString()
    };
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
    }
  },

  mounted() {
    let sheet = this.$refs.spreadsheet;
    let names = {};
    let prices = {};
    let r = 1;
    console.log("this.format: ", this.formattedDate);
    let ins = this;
    sheet.spreadsheet.events.on("AfterValueChange", function(cell, value) {
      if (r == 2) {
        // So it doesn't print out the values twice
        if (cell.startsWith("A")) {
          names[cell] = value;

          if (prices["B" + cell.substr(1, 1)]) {
            let prod = {
              prodname: value,
              prodprice: prices["B" + cell.substr(1, 1)]
            };
            ins.$store.dispatch("addProduct", prod);
            console.log("prod says: ", prod);
          }
        }

        if (cell.startsWith("B")) {
          prices[cell] = value;
          if (names["A" + cell.substr(1, 1)]) {
            let prod = {
              prodname: names["A" + cell.substr(1, 1)],
              prodprice: value
            };
            ins.$store.dispatch("addProduct", prod);
          }
        }

        r = 1;
      } else {
        r = 2;
      }
    });
    this.$store.dispatch("getProducts").then(data => {
      sheet.spreadsheet.parse(inputData(this.sortedProducts, "Product"));
      sheet.spreadsheet.lock("A1:B1");
      this.$store.commit("endTheDay", this.formattedDate);
    });
  }
};
</script>

<style scoped>
</style>
