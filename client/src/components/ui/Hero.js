import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const HeroWrapper = styled.div`
  width: 100%;
  border-radius: 5px;
  background: ${(props) => props.theme.palette.paper};
  padding: 40px 30px;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items:center;
  flex-wrap: wrap;

  .hero-actions { margin-top: 16px; }
  
  h2 { 
    font-size: 30px;
    margin-bottom: 5px;
    color: ${(props) => props.theme.palette.text.primary};
  }

  p {
    color: ${(props) => props.theme.palette.text.secondary};
  }
`;

const Hero = ({ title, description, actions }) => (
  <HeroWrapper>
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>

    <div className="hero-actions">
      {actions}
    </div>
  </HeroWrapper>
);

Hero.propTypes = {
  title: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  description: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  actions: PropTypes.oneOfType([PropTypes.element, PropTypes.node, PropTypes.func]),
};

export default Hero;
