import moment, {Moment} from '@pinecast/common/helpers/moment';

const elems = document.querySelectorAll('.has-title-date');
for (const elem of elems) {
  const date = elem.getAttribute('title')!;
  const parsed = new Date(date);
  const parsedMoment: Moment = moment(parsed);

  elem.setAttribute(
    'title',
    parsedMoment.format('dddd, MMMM Do YYYY, h:mm:ss A'),
  );
}
