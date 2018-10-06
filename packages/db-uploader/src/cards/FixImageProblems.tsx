import * as React from 'react';

import Button, {ButtonGroup} from '@pinecast/common/Button';
import Card from '@pinecast/common/Card';
import {defineMessages, FormattedMessage} from '@pinecast/i18n';

import {ImageProblem} from '../images';
import Warning from '../icons/warning';

const problemNames = defineMessages({
  min_size: {
    id: 'db-uploader.FixImageProblems.error.min_size',
    description: 'Error shown when an image being uploaded is too small',
    defaultMessage: 'The image is too small to be accepted by Apple Podcasts.',
  },
  max_size: {
    id: 'db-uploader.FixImageProblems.error.max_size',
    description: 'Error shown when an image being uploaded is too large',
    defaultMessage: 'The image is too large to be accepted by Apple Podcasts.',
  },
  not_square: {
    id: 'db-uploader.FixImageProblems.error.not_square',
    description: 'Error shown when an image being uploaded is not square',
    defaultMessage:
      'The image is not square. Apple Podcasts requires square images.',
  },
  dpi: {
    id: 'db-uploader.FixImageProblems.error.dpi',
    description:
      'Error shown when an image being uploaded is not the right DPI',
    defaultMessage:
      'The image uses a DPI that is incompatible with Apple Podcasts.',
  },
  color_space: {
    id: 'db-uploader.FixImageProblems.error.color_space',
    description:
      'Error shown when an image being uploaded is using a weird color space',
    defaultMessage:
      'The image uses a color space that is incompatible with Apple Podcasts.',
  },
  orientation: {
    id: 'db-uploader.FixImageProblems.error.orientation',
    description:
      'Error shown when an image being uploaded is the wrong orientation',
    defaultMessage:
      'The image orientation is set and will appear wrong in Apple Podcasts.',
  },

  other: {
    id: 'db-uploader.FixImageProblems.error.other',
    description:
      'Error shown when there is some other error with an uploaded image',
    defaultMessage: 'Mysterious and spooky issues!',
  },
});
function getProblemName(name: keyof typeof problemNames) {
  return <FormattedMessage {...problemNames[name] || problemNames.other} />;
}

const messages = defineMessages({
  thereAreProblems: {
    id: 'db-uploader.FixImageProblems.title',
    description: 'Title of card to fix image problems',
    defaultMessage: 'There are some problems with your image.',
  },
  copy: {
    id: 'db-uploader.FixImageProblems.copy',
    description: 'Copy of the card to fix image problems',
    defaultMessage:
      'We detected issues with the image you chose. We can fix these problems for you, if you would like.',
  },

  ctaFix: {
    id: 'db-uploader.FixImageProblems.cta.fix',
    description: 'Button to fix image problems',
    defaultMessage: 'Fix problems',
  },
  ctaIgnore: {
    id: 'db-uploader.FixImageProblems.cta.ignore',
    description: 'Button to ignore image problems',
    defaultMessage: 'Ignore',
  },
});

export default ({
  onAccept,
  onIgnore,
  problems,
}: {
  onAccept: () => void;
  onIgnore: () => void;
  problems: Array<ImageProblem>;
}) => (
  <Card whiteBack style={{flexDirection: 'row'}}>
    <Warning
      width={46}
      height={46}
      style={{flex: '0 0 46px', marginRight: 15}}
    />
    <div>
      <b style={{display: 'block'}}>
        <FormattedMessage {...messages.thereAreProblems} />
      </b>
      <span style={{display: 'block', marginBottom: '0.5em'}}>
        <FormattedMessage {...messages.copy} />
      </span>
      <ul style={{marginBottom: '1em'}}>
        {problems.map(problem => (
          <li key={problem}>{getProblemName(problem)}</li>
        ))}
      </ul>
      <ButtonGroup>
        <Button onClick={onAccept} $isPrimary>
          <FormattedMessage {...messages.ctaFix} />
        </Button>
        <Button onClick={onIgnore}>
          <FormattedMessage {...messages.ctaIgnore} />
        </Button>
      </ButtonGroup>
    </div>
  </Card>
);
