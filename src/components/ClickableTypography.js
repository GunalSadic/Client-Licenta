import React from 'react';
import { Typography } from '@mui/material';
import styled from '@emotion/styled';

const ClickableTypography = styled(Typography)({
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const ClickableText = ({ text, onClick, link}) => {
  return (
    <ClickableTypography variant="body1" onClick={onClick}>
      {text}
    </ClickableTypography>
  );
};

export default ClickableTypography;
