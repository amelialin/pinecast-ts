import * as React from 'react';

import Button from '@pinecast/common/Button';
import Card from '@pinecast/common/Card';
import styled, {CSS} from '@pinecast/styles';

const IconChip = styled('div', {
  color: '#708d9e',
  flex: '0 0 50px',
  paddingtop: 4,
});

const Detail = styled('div', {
  flex: '1 1',
});
const FeatureName = styled('strong', {
  display: 'block',
  fontSize: 16,
  fontWeight: 500,
  marginBottom: 8,
});
const FeatureDescription = styled('p', {
  display: 'block',
  lineHeight: '20px',
  margin: '0 0 12px',
});

const cardStyles: CSS = {
  flexDirection: 'row',
  margin: '0 auto 32px',
  maxWidth: 400,
  width: '100%',
};

const Feature = ({
  callToActionText,
  description,
  icon,
  iconRight,
  link,
  title,
}: {
  callToActionText?: string;
  description: string;
  icon?: JSX.Element;
  iconRight?: boolean;
  link?: string;
  title: string;
}) => (
  <Card style={cardStyles} whiteBack>
    {icon &&
      !iconRight && <IconChip style={{marginRight: 32}}>{icon}</IconChip>}
    <Detail>
      <FeatureName>{title}</FeatureName>
      <FeatureDescription>{description}</FeatureDescription>
      {callToActionText && <Button href={link}>{callToActionText}</Button>}
    </Detail>
    {icon && iconRight && <IconChip style={{marginLeft: 32}}>{icon}</IconChip>}
  </Card>
);

export default Feature;
