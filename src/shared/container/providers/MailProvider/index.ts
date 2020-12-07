import { container } from 'tsyringe';
import mailConfig from '@config/mail';

import IMailProvider from './models/IMailProvider';

import EtherealMailProvider from './implementations/EtherealMailProvider';
import SESMailProvieder from './implementations/SESMailProvieder';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvieder),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver]
);
