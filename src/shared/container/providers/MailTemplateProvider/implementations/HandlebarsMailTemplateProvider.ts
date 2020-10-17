import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import handlebars from 'handlebars';
import fs from 'fs';

class HandlebarsFakeTemplateProvider implements IMailTemplateProvider {
  public async parse(data: IParseMailTemplateDTO): Promise<string> {
    const { file, variables } = data;
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}

export default HandlebarsFakeTemplateProvider;
