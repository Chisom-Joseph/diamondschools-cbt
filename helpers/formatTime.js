const moment = require("moment");

module.exports = (time) => moment(time, "HH:mm").format("hh:mm A");
