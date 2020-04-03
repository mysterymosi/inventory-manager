<template>
  <div class="row">
    <!-- <SpreadSheet
      class="col-lg-8 col-md-8"
      ref="spreadsheet"
      :toolbar="toolbar"
      :editLine="editLine"
      :rowsCount="rowsCount"
      :colsCount="colsCount"
      :menu="menu"
      @onEndDay="endTheDay"
    />-->
    <div class="col-sm-8">
      <Table />
    </div>
    <div class="col-sm-4">
      <div class="white-box">
        <h1 class="box-title m-b-0">
          Total Expenses
          <b>$</b>
        </h1>
        <h4 class="box-text">{{ dailyItemSum[date] }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import SpreadSheet from "~/components/spread";
import { extractData } from "~/assets/js/util.js";
import { inputData } from "~/assets/js/util.js";
import Table from "~/components/Table";

export default {
  layout: "dashboard",
  components: {
    SpreadSheet,
    Table
  },
  data() {
    return {
      // toolbar: ["rows", "columns", "lock"],
      // editLine: true,
      // colsCount: 10,
      // rowsCount: 20,
      // menu: true,
      date: new Date().toDateString()
    };
  },

  computed: {
    dailyItemSum() {
      return this.$store.getters.dailyItemSum;
    },

    items() {
      return this.$store.getters.items;
    }
  },

  methods: {
    endTheDay() {
      this.$store.commit("endExpenseDay", this.date);
    }
  }

  // mounted() {
  //   let sheet = this.$refs.spreadsheet;
  //   let names = {};
  //   let prices = {};
  //   let r = 1;
  //   // console.log(`this.events says ${this.events}`);
  //   // this.$refs.spreadsheet.spreadsheet.setValue("A1", "Product Name");
  //   let ins = this;
  //   sheet.spreadsheet.events.on("AfterValueChange", function(cell, value) {
  //     // console.log(
  //     //   "Value of cell " +
  //     //     sheet.spreadsheet.selection.getSelectedCell() +
  //     //     " has changed to " +
  //     //     value
  //     // );

  //     if (r == 2) {
  //       if (cell.startsWith("A")) {
  //         names[cell] = value;
  //         if (prices["B" + cell.substr(1, 1)]) {
  //           let prod = {
  //             prodname: value,
  //             prodprice: prices["B" + cell.substr(1, 1)]
  //           };
  //           ins.$store.commit("addItem", prod);
  //         }
  //       }

  //       if (cell.startsWith("B")) {
  //         prices[cell] = value;
  //         if (names["A" + cell.substr(1, 1)]) {
  //           let prod = {
  //             prodname: names["A" + cell.substr(1, 1)],
  //             prodprice: value
  //           };
  //           ins.$store.commit("addItem", prod);
  //         }
  //       }

  //       r = 1;
  //     } else {
  //       r = 2;
  //     }
  //   });

  //   sheet.spreadsheet.parse(inputData(this.items, "Item"));
  //   sheet.spreadsheet.lock("A1:B1");
  //   this.$store.commit("endExpenseDay", this.date);
  // }
};
</script>

<style scoped>
</style>
