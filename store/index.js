import Vuex from "vuex";
import Vue from "vue";
import * as Util from "~/assets/js/util.js";

// import Cookie from "js-cookie";
const Cookie = process.client ? require("js-cookie") : undefined;
const cookieparser = process.server ? require("cookieparser") : undefined;

function loopObj(sum, obj) {
  for (let key in obj) {
    sum += obj[key];
  }
  return sum;
}

const createStore = () => {
  return new Vuex.Store({
    state: {
      profile: {},
      // incomeProducts: {},
      //INCOME STATES
      products: [
        { id: 1, prodname: "Beans", prodquan: 30, prodprice: 1000 },
        { id: 2, prodname: "Fish", prodquan: 20, prodprice: 2000 },
        { id: 3, prodname: "Meat", prodquan: 40, prodprice: 4000 },
        { id: 4, prodname: "Egg", prodquan: 10, prodprice: 50 },
        { id: 5, prodname: "Milk", prodquan: 50, prodprice: 1980 },
        { id: 6, prodname: "Shirts", prodquan: 20, prodprice: 2000 },
        { id: 7, prodname: "Pants", prodquan: 24, prodprice: 4000 },
        { id: 8, prodname: "Plates", prodquan: 44, prodprice: 2000 },
        { id: 9, prodname: "Ketchup", prodquan: 66, prodprice: 500 },
        { id: 10, prodname: "Bread", prodquan: 23, prodprice: 300 },
        { id: 11, prodname: "Cake", prodquan: 45, prodprice: 400 },
        { id: 12, prodname: "Shrimp", prodquan: 12, prodprice: 1000 },
        { id: 13, prodname: "Rice", prodquan: 19, prodprice: 3000 }
      ],
      sales: [],
      sortedProducts: [],
      dailyProductSum: {},
      weeklyProductSum: {},
      monthlyProductSum: {},

      //EXPENSE STATES
      expenses: [
        // { prodname: "Fuel", prodprice: 1000 },
        // { prodname: "Glassware", prodprice: 2000 },
        // { prodname: "Water dispensers", prodprice: 8000 }
      ],
      finalExpense: [],
      dailyItemSum: {},
      weeklyItemSum: {},
      monthlyItemSum: {},
      token: null
    },

    mutations: {
      //INCOME MUTATIONS
      addProduct(state, product) {
        state.products.push(product);
        console.log("Products says: ", JSON.stringify(state.products));
        var sum = 0;
        let date = Util.formattedDate();
        state.products.forEach(product => {
          sum += +product.prodprice;
        });
        // state.dailyItemSum[date] = sum;
        Vue.set(state.dailyProductSum, date, sum);
        console.log("Sum of product price: ", sum);
      },

      editProduct(state, payload) {
        for (let i in state.products) {
          if (Number(state.products[i].id) === Number(payload.id)) {
            state.products[i] = payload;
          }
        }
      },

      deleteProduct(state, payload) {
        for (let i in state.products) {
          if (+state.products[i].id === +payload) {
            state.products.splice(i, 1);
            console.log("state says: ", state.products);
          }
        }
      },

      addSales(state, payload) {
        state.sales.push(payload);
        console.log("Sales from state says: ", state.sales);
      },

      addProducts(state, payload) {
        state.products = payload;
        console.log("inventory from state says: ", state.products);
      },

      updateRecentSales(state, payload) {
        console.log("payload: ", payload);
        state.sales = payload;
        console.log("state says: ", state.sales);
      },

      //compute the sum of the price of pruducts for that day
      endTheDay(state, date) {
        const items = state.products;
        let sortedProducts = [];
        for (let a of items) {
          if (a.date == date) {
            sortedProducts.push(a);
          }
        }
        console.log("sorted products from mutations says: ", sortedProducts);

        const total = sortedProducts.reduce(
          (acc, item) => (acc += +item.prodprice),
          0
        );
        Vue.set(state.dailyProductSum, date, total);
        console.log("state.dailyProductSum: ", state.dailyProductSum);
      },

      //compute the sum of the price of products for that week
      endWeek(state, date) {
        Vue.set(
          state.weeklyProductSum,
          date,
          loopObj(0, state.dailyProductSum)
        );
        console.log("wps says: ", state.weeklyProductSum[date]);
        // state.dailyProductSum = {}
      },

      //compute the sum of the price of products for that month
      endMonth(state, date) {
        Vue.set(
          state.monthlyProductSum,
          date,
          loopObj(0, state.weeklyProductSum)
        );
        console.log("monthly says: ", state.monthlyProductSum[date]);
        // state.weeklyProductSum = {}
      },

      //EXPENSE MUTATIONS
      addItem(state, item) {
        let date = new Date().toDateString();
        state.expenses.push(item);
        console.log("Item says: ", JSON.stringify(state.expenses));
        var sum = 0;
        state.expenses.forEach(item => {
          sum += +item.prodprice;
        });
        // state.dailyItemSum[date] = sum;
        Vue.set(state.dailyItemSum, date, sum);
        console.log("Sum of item price: ", sum);
      },

      addExpense(state, payload) {
        console.log("payload says: ", payload);
        state.finalExpense = state.expenses.concat(payload);
        console.log("expenses says: ", state.finalExpense);
      },

      updateRecentExpenses(state, payload) {
        console.log("payload: ", payload);
        state.expenses = payload;
        console.log("state.items says: ", state.items);
      },

      endExpenseDay(state, date) {
        var sum = 0;
        state.expenses.forEach(item => {
          let price = +item.prodprice;
          console.log("price says: ", price);
          sum += price;
        });
        // state.dailyItemSum[date] = sum;
        Vue.set(state.dailyItemSum, date, sum);
        console.log("Sum of item price: ", sum);
      },

      endExpenseWeek(state, date) {
        Vue.set(state.weeklyItemSum, date, loopObj(0, state.dailyItemSum));
      },

      endExpenseMonth(state, date) {
        Vue.set(state.monthlyItemSum, date, loopObj(0, state.weeklyItemSum));
      },

      setProfile(state, profile) {
        if (profile) {
          state.profile = profile;
        }
      },

      setToken(state, token) {
        state.token = token;
      }
    },

    actions: {
      signup(context, info) {
        return this.$axios.$post("/register", info);
      },

      login(context, info) {
        return this.$axios.$post("/login", info).then(data => {
          if (data.status) {
            console.log(`Response: ${JSON.stringify(data.data.user)}`);
            context.commit("setProfile", data.data.user);
            console.log("data.jwt: ", data.data.token);
            context.commit("setToken", data.data.token);
            localStorage.setItem("access_token", data.data.token);
            localStorage.setItem("user_email", data.data.user.email);
            localStorage.setItem("user", JSON.stringify(data.data.user));
            Cookie.set("access_token", data.data.token);
            Cookie.set("user", data.data.user);
            console.log(
              "localStorage says beans",
              localStorage.getItem("access_token")
            );
          }
        });
      },

      //get today's income log on mount
      getTodaySales(context) {
        return this.$axios.$get("/search_by_date.php").then(data => {
          if (data.message) {
            console.log("sales data says: ", data.message);
            for (let i = 0; i < data.message.length; i++) {
              console.log("date says: ", data.message[i].date.substr(0, 10));
              data.message[i].date = data.message[i].date.substr(0, 10);
            }
            context.commit("updateRecentSales", data.message);
          }
        });
      },

      getPriceSum(context) {
        return this.$axios.$get("/save_total.php").then(data => {
          console.log("Price sum says: ", data);
        });
      },

      getProducts(context) {
        return this.$axios.$get("/products").then(data => {
          // for (let i = 0; i < data.records.length; i++) {
          //   console.log("date says: ", data.records[i].date.substr(0, 10));
          //   data.records[i].date = data.records[i].date.substr(0, 10);
          // }
          context.commit("addProducts", data);
          console.log("data says: ", data);
        });
      },

      addSales(context, product) {
        return this.$axios.$post("/sales", product).then(data => {
          console.log("sales data says: ", data);
          // context.commit('addSales', )
        });
      },

      addProduct(context, product) {
        // let date = new Date().toDateString();
        console.log("Add product says: ", product);
        return this.$axios
          .$post("/products", product)
          .then(data => {
            console.log("Data says: ", data);
            // if (data.status) {
            //   product.id = data.id;
            //   context.commit("addProduct", product);
            //   console.log("Successfully added products");
            // } else {
            //   console.log("Error adding products ", data.message);
            // }
          })
          .catch(err => {
            console.log("Error says: ", err);
          });
      },

      initAuth(context, req) {
        let token;
        let user;

        if (req) {
          if (!req.headers.cookie) {
            return;
          }

          const parsed = cookieparser.parse(req.headers.cookie);
          token = parsed.access_token;
          user = JSON.parse(parsed.user);

          context.commit("setToken", token);
          context.commit("setProfile", user);
        }
      }
    },

    getters: {
      profile(state) {
        return state.profile;
      },
      product(state) {
        return function(prodId) {
          for (let product of state.products) {
            if (Number(product.id) === Number(prodId)) {
              return product;
            }
          }
        };
      },

      sales(state) {
        return state.sales;
      },

      //INCOME GETTERS
      products(state) {
        return state.products;
      },

      someProducts(state) {
        let arr = [];
        for (let i = 0; i < 10; i++) {
          arr.push(state.products[i]);
        }
        return arr;
      },

      sortedProducts(state) {
        return function(date) {
          let sortedProducts = [];
          for (let a of state.products) {
            if (a.date == date) {
              sortedProducts.push(a);
            }
          }
          return sortedProducts;
        };
      },

      dailyProductSum(state) {
        return state.dailyProductSum;
      },

      weeklyProductSum(state) {
        return state.weeklyProductSum;
      },

      monthlyProductSum(state) {
        return state.monthlyProductSum;
      },

      //EXPENSE GETTERS
      items(state) {
        return state.expenses;
      },

      dailyItemSum(state) {
        return state.dailyItemSum;
      },

      weeklyItemSum(state) {
        return state.weeklyItemSum;
      },

      monthlyItemSum(state) {
        return state.monthlyItemSum;
      }
    }
  });
};

export default createStore;
