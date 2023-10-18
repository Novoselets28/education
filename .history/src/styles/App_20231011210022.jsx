import styled from 'styled-components';

const breakpoints = {
  mobile: '576px',
  tablet: '768px',
  desktop: '992px',
  largeDesktop: '1200px'
};

export const AppWrapper = styled.div`
  background-color: lightgray;
  padding: 20px;

  @media (max-width: ${breakpoints.mobile}) {
    background-color: lightcoral;
  }

  @media (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.desktop}) {
    background-color: lightseagreen;
  }

  @media (min-width: ${breakpoints.largeDesktop}) {
    background-color: lightblue;
  }
`;
