<template>
  <div>
    <div ref="container" class="widget-box"></div>
    <AppButton @click="generateFile">Generate Excel File</AppButton>
    <AppButton @click="importFile">Import Excel File</AppButton>
    <AppButton @click="$emit('onEndDay')" style="float: right;">Finish</AppButton>
  </div>
</template>

<script>
import { extractData } from "~/assets/js/util.js";
// import { json2excel } from "~/assets/js/util.js";

export default {
  props: {
    toolbar: Array,
    editLine: { type: Boolean, default: true },
    menu: Boolean,
    rowsCount: Number,
    colsCount: Number,
    type: String
  },

  data() {
    return {
      showSheet: false
    };
  },

  computed: {
    items() {
      return this.$store.getters.items;
    }
  },

  mounted: function() {
    require("dhx-spreadsheet/codebase/spreadsheet.min.css");
    const Spreadsheet = require("dhx-spreadsheet").Spreadsheet;
    this.spreadsheet = new Spreadsheet(this.$refs.container, {
      toolbar: this.toolbar,
      editLine: this.editLine,
      menu: this.menu,
      rowsCount: this.rowsCount,
      colsCount: this.colsCount,
      exportModulePath: "https://cdn.dhtmlx.com/libs/json2excel/1.0/worker.js",
      importModulePath: "https://cdn.dhtmlx.com/libs/excel2json/1.0/worker.js"
    });
    console.log("sss", this.type);

    // console.log("json to excel: ", json2excel(this.items, this.rowsCount));
    this.spreadsheet.parse([
      {
        cell: "A1",
        value: this.type == "income" ? "Product Name" : "Item Name"
      },
      {
        cell: "B1",
        value: this.type == "income" ? "Product Price" : "Item Price"
      }
    ]);
    // this.spreadsheet.parse(this.items);
    // this.spreadsheet.events.on("AfterValueChange", function(cell, value) {
    //   console.log(
    //     "Value of cell " +
    //       this.spreadsheet.selection.getSelectedCell() +
    //       " has changed to " +
    //       value
    //   );
    // });
  },
  beforeDestroy: function() {
    this.spreadsheet.destructor();
  },

  methods: {
    generateFile() {
      this.lockCell();
      this.spreadsheet.export.xlsx();
      console.log("Excel file generated");
    },

    lockCell() {
      return this.spreadsheet.lock("A1:B1");
    },
    importFile() {
      this.spreadsheet.load("", "xlsx").then(() => {
        console.log("Success", this.spreadsheet.getValue("A2:B2"));
        console.log("data: ", extractData(this.spreadsheet, this.rowsCount));
        let sheetdata = extractData(this.spreadsheet, this.rowsCount);
        console.log("sheetdata: ", sheetdata);
        let path = this.$route.path;
        if (path === "/admin/expense") {
          this.$store.commit("updateRecentExpenses", sheetdata);
        } else if (path === "/admin/income") {
          this.$store.commit("updateRecentSales", sheetdata);
        }
        this.showSheet = true;
      });
    }

    // extractData(spreadsheet) {
    //   let obj = [];
    //   for (let i = 2; i < this.rowsCount; i++) {
    //     if (
    //       spreadsheet.getValue("A" + i).length > 0 &&
    //       spreadsheet.getValue("B" + i).length > 0
    //     ) {
    //       obj.push({
    //         prodname: spreadsheet.getValue("A" + i),
    //         prodprice: spreadsheet.getValue("B" + i)
    //       });
    //     }
    //   }
    //   return obj;
    // }
  }
};
</script>

<style scoped>
.widget-box {
  height: 100vh;
}
</style>