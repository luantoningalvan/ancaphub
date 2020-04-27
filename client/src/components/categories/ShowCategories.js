import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Category = styled.div`
  background: ${(props) => props.theme.palette.secondary};
  padding:8px;
  border-radius: 4px;
  cursor: pointer;

  a { color: ${(props) => props.theme.palette.text.contrast}; }

  &:hover {
    filter: brightness(90%);
  }
`;

export default ({ categories }) => (
  <div style={{ display: 'flex' }}>
    {categories && categories.length > 0 ? (
      <>
        {categories.map((category) => (
          <Category>
            <Link to={`/library?category=${category._id}`}>
              {category.name}
            </Link>
          </Category>
        ))}
      </>
    ) : (
      <p style={{ padding: 8 }}>
        <FormattedMessage id="components.categories.none" />
      </p>
    )}

  </div>
);
