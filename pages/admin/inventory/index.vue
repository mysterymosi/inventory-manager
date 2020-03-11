<template>
  <div class="row">
    <div class="col-sm-8">
      <Table v-show="!addProduct" @onAddProduct="handleAdd" />
      <Spreadsheet
        v-show="addProduct"
        ref="spreadsheet"
        :toolbar="toolbar"
        :editLine="editLine"
        :rowsCount="rowsCount"
        :colsCount="colsCount"
        :menu="menu"
        @onEndDay="finish"
      />
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
      addProduct: false,
      toolbar: ["rows", "columns", "lock"],
      editLine: true,
      colsCount: 10,
      rowsCount: 20,
      menu: true
    };
  },

  methods: {
    handleAdd() {
      this.addProduct = true;
      let sheet = this.$refs.spreadsheet;
      let names = {};
      let prices = {};
      let r = 1;
      console.log("this.format: ", this.formattedDate);
      let ins = this;
      sheet.spreadsheet.parse([
        { cell: "A1", value: "Product Name" },
        { cell: "B1", value: "Product Price" }
      ]);
      sheet.spreadsheet.lock("A1:B1");
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
    },

    finish() {
      this.addProduct = false;
    }
  }
};
</script>