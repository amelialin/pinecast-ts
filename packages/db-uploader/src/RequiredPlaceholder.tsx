import {gettext} from '@pinecast/i18n';
import styled from '@pinecast/styles';

export default styled(
  'input',
  {
    appearance: 'none',
    MozAppearance: 'none',
    WebkitAppearance: 'none',
    border: 0,
    height: 0,
    margin: 0,
    opacity: 0.00001,
    padding: 0,
    width: 0,
  },
  {
    className: 'required-placeholder',
    required: true,
    title: gettext('You must upload a file'),
    type: 'text',
  },
);
