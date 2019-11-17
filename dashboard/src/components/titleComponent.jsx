import React from 'react';
import Helmet from 'react-helmet';

const TitleComponent = ({ title }) => {
    var defaultTitle = `Painel Administrativo - AncapHub`;
    return (
        <Helmet>
            <title>{title ? `${title} - AncapHub` : defaultTitle}</title>
        </Helmet>
    );
};

export default TitleComponent;