const moment = require("moment");

module.exports = (date) => moment(date).format("MMMM Do YYYY, h:mm:ss a");
