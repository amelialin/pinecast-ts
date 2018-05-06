import fullWidthImageCenterStackedItem from './stacked/fullWidthImageCenterStackedItem';
import fullWidthImageLeftStackedItem from './stacked/fullWidthImageLeftStackedItem';
import heroFullWidthStackedItem from './stacked/heroFullWidthStackedItem';
import minimalGrid from './grid/minimalGridItem';
import noImageStackedItem from './stacked/noImageStackedItem';

const fixedWidthTemplate = {
  elementOptions: {
    name: 'Fixed-width module options',
    type: 'rootComponents.fixedWidth',
  },
};
const textAlignTemplate = {
  textAlign: {
    name: 'Text alignment',
    type: 'enum',
    options: [
      {name: 'Left', value: 'left'},
      {name: 'Center', value: 'center'},
      {name: 'Right', value: 'right'},
    ],
  },
};

const artworkSizeOptions = [
  {key: 300, label: '300px'},
  {key: 200, label: '200px'},
  {key: 150, label: '150px'},
  {key: 100, label: '100px'},
  {key: 75, label: '75px'},
];

export default {
  'grid.minimal': {
    name: 'Minimal grid item',
    description: 'A simple grid tile.',
    type: 'grid',
    func: minimalGrid,

    schema: {
      showSubtitle: {
        name: 'Show subtitle?',
        type: 'bool',
      },
      size: {
        name: 'Image size',
        type: 'enum',
        options: artworkSizeOptions,
      },
    },
  },

  'stacked.noImage': {
    name: 'Text-only stacked item',
    description: 'A simple stacked layout with no image.',
    type: 'stacked',
    func: noImageStackedItem,
  },
  'stacked.heroFullWidth': {
    name: 'Full width hero',
    description: 'A stacked layout meant to be used as the hero.',
    type: 'stacked',
    func: heroFullWidthStackedItem,

    schema: {
      position: {
        name: 'Background image centering',
        type: 'enum',
        options: [
          {key: 'left top', label: 'Top left corner'},
          {key: 'center top', label: 'Top edge'},
          {key: 'right top', label: 'Top right corner'},
          {key: 'left center', label: 'Left edge'},
          {key: 'center center', label: 'Center'},
          {key: 'right center', label: 'Right edge'},
          {key: 'left bottom', label: 'Bottom left corner'},
          {key: 'center bottom', label: 'Bottom edge'},
          {key: 'right bottom', label: 'Bottom right corner'},
        ],
      },
    },
  },
  'stacked.fullWidthImageCenter': {
    name: 'Full width, stacked layout',
    description:
      'A stacked layout where all elements are arranged in a column.',
    type: 'stacked',
    func: fullWidthImageCenterStackedItem,

    schema: {
      ordering: {
        name: 'Elements',
        type: 'orderedSet',
        options: [
          {key: 'date', label: 'Publish date'},
          {key: 'title', label: 'Title'},
          {key: 'subtitle', label: 'Subtitle'},
          {key: 'summary', label: 'Summary (excerpt of description)'},
          {key: 'image', label: 'Episode artwork'},
          {key: 'readMore', label: 'Read more link'},
        ],
      },
      imageHeight: {
        name: 'Episode artwork height',
        type: 'enum',
        options: artworkSizeOptions,
      },
      maxLinesOfSummary: {
        canBeNegative: false,
        min: 1,
        name: 'Summary line count',
        suffix: 'lines',
        type: 'number',
      },
    },
  },
  'stacked.fullWidthImageSide': {
    name: 'Full width, left-aligned image',
    description:
      'A stacked layout where all elements are arranged in a column.',
    type: 'stacked',
    func: fullWidthImageLeftStackedItem,

    schema: {
      ordering: {
        name: 'Elements',
        type: 'orderedSet',
        options: [
          {key: 'title', label: 'Title'},
          {key: 'subtitle', label: 'Subtitle'},
          {key: 'summary', label: 'Summary (excerpt of description)'},
          {key: 'player', label: 'Player'},
        ],
      },
      imageSize: {
        name: 'Episode artwork width',
        type: 'enum',
        options: artworkSizeOptions,
      },
      maxLinesOfSummary: {
        canBeNegative: false,
        min: 1,
        name: 'Summary line count',
        suffix: 'lines',
        type: 'number',
      },
      imageSize: {
        name: 'Episode artwork width',
        type: 'enum',
        options: artworkSizeOptions,
      },
      padding: {
        name: 'Inner episode padding',
        type: 'padding',
      },
    },
  },
};
