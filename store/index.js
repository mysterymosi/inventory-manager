import Vuex from "vuex";
import Vue from "vue";
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
        { prodname: "Beans", prodprice: 1000 },
        { prodname: "Toad", prodprice: 2000 },
        { prodname: "Rice", prodprice: 3000 }
      ],
      dailyProductSum: {},
      weeklyProductSum: {},
      monthlyProductSum: {},

      //EXPENSE STATES
      items: [
        { prodname: "Fuel", prodprice: 1000 },
        { prodname: "Glassware", prodprice: 2000 },
        { prodname: "Water dispensers", prodprice: 8000 }
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
      },

      updateRecentSales (state, payload) {
        state.products = payload
      },

      //compute the sum of the price of pruducts for that day
      endTheDay(state, date) {
        const items = state.products;
        const total = items.reduce((acc, item) => (acc += item.prodprice), 0);
        state.dailyProductSum[date] = total;
        state.products = [];
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
        state.items.push(item);
        console.log("Item says: ", JSON.stringify(state.items));
      },

      endExpenseDay(state, date) {
        var sum = 0;
        state.items.forEach(item => {
          sum += item.prodprice;
        });
        state.dailyItemSum[date] = sum;
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

      addProduct(context, product) {
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

      weeklyItemSum (state) {
        return state.weeklyItemSum
      },

      monthlyItemSum (state) {
        return state.monthlyItemSum
      }
    }
  });
};

export default createStore;
