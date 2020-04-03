<template>
  <div>
    <!-- <div class="row" style="margin-bottom: 40px;">
      <div class="col-sm-6">
        <button @click="endWeekIncome" class="btn btn-lg btn-success">END THE WEEK (INCOME)</button>
      </div>
    </div>-->
    <div class="row">
      <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
        <div class="white-box">
          <h3 class="box-title">Daily Sales</h3>
          <div class="text-right">
            <span class="text-muted">Todays Income</span>
            <h1>
              <sup>
                <i @click="$router.replace('admin/income')" class="ti-arrow-up text-success"></i>
              </sup>
              {{ dailySum }}
            </h1>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
        <div class="white-box">
          <h3 class="box-title">Weekly Sales</h3>
          <div class="text-right">
            <span class="text-muted">Weekly Income</span>
            <h1>
              <sup>
                <i class="ti-arrow-up text-danger"></i>
              </sup>
              {{ weeklySum[date] }}
            </h1>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-12 col-sm-6 col-xs-12">
        <div class="white-box">
          <h3 class="box-title">Monthly Sales</h3>
          <div class="text-right">
            <span class="text-muted">Monthly Income</span>
            <h1>
              <sup>
                <i class="ti-arrow-up text-info"></i>
              </sup>
              {{ monthlySum[date] }}
            </h1>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="row" style="margin-bottom: 40px;">
      <div class="col-sm-6">
        <button @click="endWeekExpense" class="btn btn-lg btn-success">END THE WEEK (EXPENSE)</button>
      </div>
    </div>-->

    <div class="row">
      <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
        <div class="white-box">
          <h3 class="box-title">Daily Expenses</h3>
          <div class="text-right">
            <span class="text-muted">Todays Expenses</span>
            <h1>
              <sup>
                <i class="ti-arrow-up text-success"></i>
              </sup>
              {{ dailyItemSum[date] }}
            </h1>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
        <div class="white-box">
          <h3 class="box-title">Weekly Expenses</h3>
          <div class="text-right">
            <span class="text-muted">Weekly Expenses</span>
            <h1>
              <sup>
                <i class="ti-arrow-up text-danger"></i>
              </sup>
              {{ weeklyItemSum[date] }}
            </h1>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-12 col-sm-6 col-xs-12">
        <div class="white-box">
          <h3 class="box-title">Monthly Expenses</h3>
          <div class="text-right">
            <span class="text-muted">Monthly Expenses</span>
            <h1>
              <sup>
                <i class="ti-arrow-up text-info"></i>
              </sup>
              {{ monthlyItemSum[date] }}
            </h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Object.prototype.isEmpty = function() {
//   for (let key in this) {
//     if (this.hasOwnProperty(key)) {
//       return false;
//     }
//   }
//   return true;
// };
import { isEmpty } from "~/assets/js/util.js";

export default {
  layout: "dashboard",

  data() {
    return {
      date: new Date().toDateString()
      // counter: 0,
      // expCounter: 0
    };
  },

  mounted() {
    // this.counter = Number(localStorage.getItem("counter"));
    // console.log("mounted counter says: ", this.counter);
    // this.expCounter = Number(localStorage.getItem("expCounter"));
    // console.log("mounted expCounter saysL ", this.expCounter);
  },

  methods: {
    // endWeekIncome() {
    //   this.counter++;
    //   this.$store.commit("endWeek", this.date);
    //   console.log("income counter says: ", this.counter);
    //   localStorage.setItem("counter", this.counter.toString());
    //   let newCounter = Number(localStorage.getItem("counter"));
    //   console.log("new counter = ", newCounter);
    //   if (newCounter % 4 == 0) {
    //     this.$store.commit("endMonth", this.date);
    //     console.log(
    //       "monthly sum from admin says: ",
    //       this.monthlySum[this.date]
    //     );
    //   }
    // },
    // endWeekExpense() {
    //   this.expCounter++;
    //   this.$store.commit("endExpenseWeek", this.date);
    //   console.log("expense counter says: ", this.expCounter);
    //   localStorage.setItem("expCounter", this.expCounter.toString());
    //   let newCounter = Number(localStorage.getItem("expCounter"));
    //   console.log("new counter = ", newCounter);
    //   if (newCounter % 4 == 0) {
    //     this.$store.commit("endExpenseMonth", this.date);
    //   }
    // }
  },

  computed: {
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
    },

    //INCOME COMPUTED PROPERTIES
    dailySum() {
      // if (isEmpty(this.$store.getters.dailyProductSum)) {
      //   return "No Sales Yet";
      // }
      return this.$store.getters.dailyProductSum[this.formattedDate];
    },

    weeklySum() {
      return this.$store.getters.weeklyProductSum;
    },

    monthlySum() {
      return this.$store.getters.monthlyProductSum;
    },

    //EXPENSE COMPUTED PROPERTIES
    dailyItemSum() {
      return this.$store.getters.dailyItemSum;
    },

    weeklyItemSum() {
      return this.$store.getters.weeklyItemSum;
    },

    monthlyItemSum() {
      return this.$store.getters.monthlyItemSum;
    }
  }
};
</script>

<style scoped>
.ti-arrow-up:hover {
  cursor: pointer;
}
</style>