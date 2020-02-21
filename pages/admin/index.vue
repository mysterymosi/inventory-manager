<template>
  <div>
    <div class="row" style="margin-bottom: 40px;">
      <div class="col-sm-6">
        <button @click="endWeekIncome" class="btn btn-lg btn-success">END THE WEEK (INCOME)</button>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
        <div class="white-box">
          <h3 class="box-title">Daily Sales</h3>
          <div class="text-right">
            <span class="text-muted">Todays Income</span>
            <h1>
              <sup>
                <i class="ti-arrow-up text-success"></i>
              </sup>
              {{ dailySum[date] }}
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
                <i class="ti-arrow-down text-danger"></i>
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

    <div class="row" style="margin-bottom: 40px;">
      <!-- <div class="col-sm-6">
                <router-link :to="{name: 'ExpenseForm'}" class="btn btn-lg btn-success">START THE DAY (EXPENSE)</router-link>
      </div>-->
      <div class="col-sm-6">
        <button @click="endWeekExpense" class="btn btn-lg btn-success">END THE WEEK (EXPENSE)</button>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-3 col-md-6 col-sm-6 col-xs-12">
        <div class="white-box">
          <h3 class="box-title">Daily Sales</h3>
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
          <h3 class="box-title">Weekly Sales</h3>
          <div class="text-right">
            <span class="text-muted">Weekly Expenses</span>
            <h1>
              <sup>
                <i class="ti-arrow-down text-danger"></i>
              </sup>
              {{ weeklyItemSum[date] }}
            </h1>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-12 col-sm-6 col-xs-12">
        <div class="white-box">
          <h3 class="box-title">Monthly Sales</h3>
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
export default {
  layout: "dashboard",

  data() {
    return {
      date: new Date().toDateString(),
      counter: 0
    };
  },

  methods: {
    endWeekIncome() {
      this.counter++;
      this.$store.commit("endWeek", this.date);
      console.log("income counter says: ", this.counter);
      if (this.counter % 4 == 0) {
        this.$store.commit("endMonth", this.date);
        console.log(
          "monthly sum from admin says: ",
          this.monthlySum[this.date]
        );
      }
      // console.log("weekly sum from admin says: ", this.weeklySum[this.date])
    },

    endWeekExpense() {
      this.counter++;
      this.$store.commit("endExpenseWeek", this.date);
      console.log("expense counter says: ", this.counter);
      if (this.counter % 4 == 0) {
        this.$store.commit("endExpenseMonth", this.date);
      }
    }
  },

  computed: {
    //INCOME COMPUTED PROPERTIES
    

    dailySum() {
      return this.$store.getters.dailyProductSum;
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
  },

  mounted() {
    console.log("Daily sum from admin says: ", this.dailySum[this.date]);
  }
};
</script>