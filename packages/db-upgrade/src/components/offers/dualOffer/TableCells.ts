import styled, {CSS} from '@pinecast/styles';

const styles: CSS = {
  ...({
    borderBottom: '1px solid #dee1df',
    lineHeight: '36px',
    textAlign: 'center',
    width: 120,
  } as CSS),
  '@media (max-width: 600px)': {
    width: 'auto',
    minWidth: 60,
  } as CSS,
} as any;

const rowLabelStyles: CSS = {
  borderBottom: '1px solid #dee1df',
  lineHeight: '30px',
  textAlign: 'left',
};

export const HeadingLabel = styled('th', rowLabelStyles);
export const RowLabel = styled('td', rowLabelStyles);

export const Td = styled('td', styles);
export const Th = styled('th', {...styles, fontSize: 16, fontWeight: 500});
