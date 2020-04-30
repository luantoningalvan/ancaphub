import React from 'react';
import { FormattedMessage } from 'react-intl';
import Card from '../../../components/ui/Card';
import CardBody from '../../../components/ui/CardBody';

export default () => (
  <Card>
    <CardBody>
      <FormattedMessage id="account.settings.noneAvailable" values={{ what: <FormattedMessage id="common.notifications" /> }} />
    </CardBody>
  </Card>
);
