import ISendMailDTO from '../dtos/ISendMailDTO';

interface IEmailProvider {
  sendMail(data: ISendMailDTO): Promise<void>;
}

export default IEmailProvider;
