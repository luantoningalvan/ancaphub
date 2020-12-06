import Category from '../infra/typeorm/entities/Category';
import ICategoryRepository from '../repositories/ICategoryRepository';
import { inject, injectable } from 'tsyringe';

interface Request {
  name: string;
  slug: string;
}

@injectable()
export default class CreateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoryRepository,
  ) {}

  public async execute({ name, slug }: Request): Promise<Category> {
    const category = await this.categoriesRepository.create({
      name,
      slug,
    });

    return category;
  }
}
