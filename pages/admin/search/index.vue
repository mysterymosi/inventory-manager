<template>
  <div class="row">
    <div class="col-md-6">
      <div class="white-box">
        <h3 class="box-title m-b-0">Search through income</h3>
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

          <!-- <div class="form-group">
            <div class="col-sm-offset-3 col-sm-9">
              <div class="checkbox checkbox-success">
                <input id="checkbox33" type="checkbox" />
                <label for="checkbox33">Check me out !</label>
              </div>
            </div>
          </div>-->
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
    <div class="col-md-6">
      <div class="white-box">
        <h3 class="box-title m-b-0">Search through expenses</h3>
        <p class="text-muted m-b-30 font-13">Enter year, month and day</p>
        <form class="form-horizontal">
          <div class="form-group">
            <label for="exampleInputuname" class="col-sm-3 control-label">Year*</label>
            <div class="col-sm-9">
              <div class="input-group">
                <input
                  v-model="expenseProps.year"
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
                  v-model="expenseProps.month"
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
                  v-model="expenseProps.day"
                  type="number"
                  class="form-control"
                  id="exampleInputpwd1"
                  placeholder="DD"
                />
              </div>
            </div>
          </div>

          <!-- <div class="form-group">
            <div class="col-sm-offset-3 col-sm-9">
              <div class="checkbox checkbox-success">
                <input id="checkbox33" type="checkbox" />
                <label for="checkbox33">Check me out !</label>
              </div>
            </div>
          </div>-->
          <div class="form-group m-b-0">
            <div class="col-sm-offset-3 col-sm-9">
              <button type="submit" class="btn btn-info waves-effect waves-light m-t-10">
                <i class="fa fa-search"></i> Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "dashboard",

  data() {
    return {
      incomeProps: {
        year: "",
        month: "",
        day: ""
      },

      expenseProps: {
        year: "",
        month: "",
        day: ""
      }
    };
  },

  methods: {
    search() {}
  }
};
</script>