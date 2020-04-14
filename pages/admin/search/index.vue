<template>
  <div class="row">
    <div class="col-md-4">
      <div class="white-box">
        <h3 class="box-title m-b-0">Search through logs</h3>
        <p class="text-muted m-b-30 font-13">Enter year, month and day</p>
        <form class="form-horizontal">
          <div class="form-group">
            <label for="exampleInputuname" class="col-sm-3 control-label">Year*</label>
            <div class="col-sm-9">
              <div class="input-group">
                <input
                  v-model="incomeProps.year"
                  type="number"
                  class="form-control"
                  id="exampleInputuname"
                  placeholder="YYYY"
                />
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1" class="col-sm-3 control-label">Month*</label>
            <div class="col-sm-9">
              <div class="input-group">
                <input
                  v-model="incomeProps.month"
                  type="number"
                  class="form-control"
                  id="exampleInputEmail1"
                  placeholder="MM"
                />
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-3 control-label">Day*</label>
            <div class="col-sm-9">
              <div class="input-group">
                <input
                  v-model="incomeProps.day"
                  type="number"
                  class="form-control"
                  id="exampleInputpwd1"
                  placeholder="DD"
                />
              </div>
            </div>
          </div>

          <div class="form-group">
            <!-- <label class="control-label">Membership</label> -->
            <div class="radio-list" v-show="!show">
              <label class="radio-inline p-0">
                <div class="radio radio-info">
                  <input type="radio" name="radio" id="radio1" value="income" v-model="type" />
                  <label for="radio1">Income</label>
                </div>
              </label>
              <label class="radio-inline">
                <div class="radio radio-info">
                  <input type="radio" name="radio" id="radio2" value="expense" v-model="type" />
                  <label for="radio2">Expenses</label>
                </div>
              </label>
            </div>
          </div>
          <div class="form-group m-b-0">
            <div class="col-sm-offset-3 col-sm-9">
              <button
                @click.prevent="search"
                type="submit"
                class="btn btn-info waves-effect waves-light m-t-10"
              >
                <i class="fa fa-search"></i> Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <SpreadSheet
      v-if="show"
      class="col-lg-8 col-md-8"
      ref="spreadsheet"
      :toolbar="toolbar"
      :editLine="editLine"
      :rowsCount="rowsCount"
      :colsCount="colsCount"
      :menu="menu"
      @onEndDay="finish"
      :type="type"
    />
  </div>
</template>

<script>
import SpreadSheet from "~/components/spread";
export default {
  layout: "dashboard",
  components: {
    SpreadSheet
  },
  data() {
    return {
      toolbar: ["rows", "columns", "lock"],
      editLine: true,
      colsCount: 7,
      rowsCount: 16,
      menu: true,
      incomeProps: {
        year: "",
        month: "",
        day: ""
      },

      type: "",
      show: false
    };
  },

  methods: {
    search() {
      console.log("radio says: ", this.type);
      this.show = true;
    },

    finish() {
      this.show = false;
    }
  }
};
</script>