const moment = require("moment");

module.exports = (date) => moment(date, "YYYY-MM-DD").format("dddd, Do MMMM");
