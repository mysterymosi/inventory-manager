<template>
  <div class="row">
    <div class="col-lg-12 col-md-8 col-sm-6">
      <!-- <div class="white-box"> -->
        <TablePanel :key="chartKey" title="Income Table" @onEndTheDay="endDay">
          <gc-spread-sheets :hostClass="hostClass" @workbookInitialized="workbookInit">
            <gc-worksheet
              :dataSource="tableData"
              :name="sheetName"
              :autoGenerateColumns="autoGenerateColumns"
            >
              <!-- <gc-column
                :width="50"
                :dataField="'id'"
                :headerText="'ID'"
                :visible="visible"
                :resizable="resizable"
              ></gc-column> -->
              <gc-column
                :width="200"
                :dataField="'prodname'"
                :headerText="'Product Name'"
                :visible="visible"
                :resizable="resizable"
              ></gc-column>
              <gc-column
                :width="320"
                :headerText="'Product Price'"
                :dataField="'prodprice'"
                :visible="visible"
                :resizable="resizable"
              ></gc-column>
              <!-- <gc-column
                :width="100"
                :dataField="'value'"
                :headerText="'Value'"
                :visible="visible"
                :formatter="priceFormatter"
                :resizable="resizable"
              ></gc-column>
              <gc-column
                :width="100"
                :dataField="'itemCount'"
                :headerText="'Quantity'"
                :visible="visible"
                :resizable="resizable"
              ></gc-column>
              <gc-column
                :width="100"
                :dataField="'soldBy'"
                :headerText="'Sold By'"
                :visible="visible"
                :resizable="resizable"
              ></gc-column>
              <gc-column
                :width="100"
                :dataField="'country'"
                :headerText="'Country'"
                :visible="visible"
                :resizable="resizable"
              ></gc-column> -->
            </gc-worksheet>
          </gc-spread-sheets>
          <div class="dashboardRow">
            <button class="btn btn-primary dashboardButton" @click="exportSheet">Export to Excel</button>
            <div>
              <b>Import Excel File:</b>
              <div>
                <input type="file" class="fileSelect" @change="fileChange($event)" />
              </div>
            </div>
          </div>
        </TablePanel>

        <!-- <h3 class="box-title m-b-0">Income Page</h3>
                <p class="text-muted m-b-30 font-13"> Enter Product Sold </p>
                <AdminForm :product = "product" @handleAdd="addProducts"/>
                
            </div>
        </div>
        <div class="col-sm-6">
            <div class="white-box">
                <h3 class="box-title">Income Table <span style="float: right;">{{ date | dateFilter }}</span></h3>
        <Table @onEndTheDay="handleEndTheDay"/>-->
      <!-- </div> -->
    </div>
  </div>
</template>

<!--<script> 
// import AdminForm from '~/components/AdminForm'
// import Table from '~/components/Table'
// import TablePanel from "~/components/Tablepanel";

// export default {
//   layout: "dashboard",
//   components: {
//     AdminForm,
//     Table
//   },

//   data() {
//     return {
//       date: new Date().toDateString(),
//       product: {
//         name: "",
//         price: ""
//       }
//     };
//   },

//   methods: {
//     addProducts() {
//       this.$store.dispatch("addProduct", {
//         prodname: this.product.name,
//         prodprice: this.product.price
//       });
//       // console.log("expense says: ", this.product)
//     },

//     handleEndTheDay() {
//       console.log("The day has ended");
//       this.$store.commit("endTheDay", this.date);
//     }
//   }
// };
</script> -->
<script>
/* eslint-disable */
import "@grapecity/spread-sheets/styles/gc.spread.sheets.excel2016colorful.css";

// SpreadJS imports
import "@grapecity/spread-sheets-vue";
import Excel from "@grapecity/spread-excelio";
import { saveAs } from "file-saver";

import TablePanel from "~/components/TablePanel";
import { extractSheetData } from "~/assets/js/util.js";

export default {
  components: { TablePanel },
  // props: ["tableData"],
  layout: 'dashboard',
  data() {
    return {
      sheetName: "Sales Data",
      hostClass: "spreadsheet",
      autoGenerateColumns: true,
      width: 200,
      visible: true,
      resizable: true,
      priceFormatter: "$ #.00",
      chartKey: 1,
      date: new Date().toDateString()
    };
  },

  created () {
    console.log('store', this.$store.state.products)
  },

  computed: {
      tableData () {
          return this.$store.state.products
      }
  },

  methods: {
    workbookInit: function(spread) {
      this._spread = spread;
    },
    fileChange: function(e) {
      if (this._spread) {
        const fileDom = e.target || e.srcElement;
        const excelIO = new Excel.IO();
        const spread = this._spread;
        const store = this.$store;

        const deserializationOptions = {
          frozenRowsAsColumnHeaders: true
        };

        excelIO.open(fileDom.files[0], data => {
          console.dir(extractSheetData(data));
          const newSalesData = extractSheetData(data);
          store.commit("updateRecentSales", newSalesData);
        });
      }
    },
    exportSheet: function() {
      const spread = this._spread;
      const fileName = "SalesData.xlsx";

      const sheet = spread.getSheet(0);
      const excelIO = new Excel.IO();
      const json = JSON.stringify(
        spread.toJSON({
          includeBindingSource: true,
          columnHeadersAsFrozenRows: true
        })
      );
      console.log('JSON data says: ', json)

      excelIO.save(
        json,
        blob => {
          saveAs(blob, fileName);
        },
        function(e) {
          alert(e);
        }
      );
    },

    endDay () {
      console.log("Day ended")
      this.$store.commit('endTheDay', this.date)
    }
  }
};
</script>

<style scoped>
.spreadsheet {
  width: 100%;
  height: 400px;
  border: 1px solid lightgray;
}

.fileSelect {
  width: 100%;
  margin-top: 20px;
}
</style>

