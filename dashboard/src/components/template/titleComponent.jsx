import React from 'react';
import Helmet from 'react-helmet';

export default ({ title }) => (
  <Helmet>
    <title>{title ? `${title} - AncapHub` : 'Painel Administrativo - AncapHub'}</title>
  </Helmet>
)