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
        // { prodname: "Beans", prodprice: 1000 },
        // { prodname: "Toad", prodprice: 2000 },
        // { prodname: "Rice", prodprice: 3000 }
      ],
      sortedProducts: [],
      dailyProductSum: {},
      weeklyProductSum: {},
      monthlyProductSum: {},

      //EXPENSE STATES
      items: [
        // { prodname: "Fuel", prodprice: 1000 },
        // { prodname: "Glassware", prodprice: 2000 },
        // { prodname: "Water dispensers", prodprice: 8000 }
      ],
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

      updateRecentSales(state, payload) {
        console.log("payload: ", payload);
        state.products = payload;
        console.log("state says: ", state.products);
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
        state.items.push(item);
        console.log("Item says: ", JSON.stringify(state.items));
        var sum = 0;
        state.items.forEach(item => {
          sum += +item.prodprice;
        });
        // state.dailyItemSum[date] = sum;
        Vue.set(state.dailyItemSum, date, sum);
        console.log("Sum of item price: ", sum);
      },

      updateRecentExpenses(state, payload) {
        console.log("payload: ", payload);
        state.items = payload;
        console.log("state.items says: ", state.items);
      },

      endExpenseDay(state, date) {
        var sum = 0;
        state.items.forEach(item => {
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
        return this.$axios.$post("/create_users.php", info);
      },

      login(context, info) {
        return this.$axios.$post("/login.php", info).then(data => {
          if (data.success) {
            console.log(`Response: ${JSON.stringify(data.userData)}`);
            context.commit("setProfile", data.userData);
            console.log("data.jwt: ", data.jwt);
            context.commit("setToken", data.jwt);
            localStorage.setItem("access_token", data.jwt);
            localStorage.setItem("user_email", data.userData.email);
            localStorage.setItem("user", JSON.stringify(data.userData));
            Cookie.set("access_token", data.jwt);
            Cookie.set("user", data.userData);
            console.log(
              "localStorage says beans",
              localStorage.getItem("access_token")
            );
          }
        });
      },

      getProducts(context) {
        return this.$axios.$get("/read.php").then(data => {
          for (let i = 0; i < data.records.length; i++) {
            console.log("date says: ", data.records[i].date.substr(0, 10));
            // Vue.set(
            //   data.records[i],
            //   data.records[i].date,
            //   data.records[i].date.substr(0, 10)
            // );
            data.records[i].date = data.records[i].date.substr(0, 10);
          }
          context.commit("updateRecentSales", data.records);
        });
      },

      addProduct(context, product) {
        // let date = new Date().toDateString();
        console.log("Add product says: ", product);
        return this.$axios
          .$post("/create.php", product)
          .then(data => {
            console.log("Data says: ", data);
            if (data.status) {
              product.id = data.id;
              context.commit("addProduct", product);
              console.log("Successfully added products");
            } else {
              console.log("Error adding products ", data.message);
            }
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

      //INCOME GETTERS
      products(state) {
        return state.products;
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
        return state.items;
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
