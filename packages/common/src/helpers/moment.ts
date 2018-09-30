import {Moment} from 'moment';
let moment = require('moment');
if (moment.default) {
  moment = moment.default;
}

export default moment;
export {Moment};
