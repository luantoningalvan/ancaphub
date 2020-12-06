import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import { inject, injectable } from 'tsyringe';
import path from 'path';

interface IRequest {
  email: string;
}

@injectable()
export default class SendForgotPasswordEmailSevice {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError('Users does not exist');

    const { token } = await this.userTokensRepository.generate(user.id);

    const forgotPasswordTemplatePath = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs'
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: 'Recuperação de Senha(GOBARBER)',
      templateData: {
        file: forgotPasswordTemplatePath,
        variables: {
          name: user.name,
          link: `${process.env.WEB_CLIENT_URL}/reset_password?token=${token}`,
        },
      },
    });
  }
}
