import Vue from 'vue'

const months = [
    "Jauary",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

const dateFilter = value => {return formatDate(value)}

function formatDate(inputDate) {
    const date = new Date(inputDate)
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    const formattedDate = day + ", " + months[month] + " " + year
    return formattedDate
}

Vue.filter('dateFilter', dateFilter)