import React from "react";
import styled from "styled-components";

const HeroWrapper = styled.div`
  width: 90%;
  max-width: 1000px;
  border-radius:5px;
  background: ${ props => props.theme.pallete.paper };
  padding: 40px 30px;
  margin-top: 15px;

  > h2 { 
    font-size:30px;
    margin-bottom:5px
  }
`;

const Hero = ({ title, description }) => (
  <HeroWrapper>
    <h2>{title}</h2>
    <p>{description}</p>
  </HeroWrapper>
);

export default Hero;
