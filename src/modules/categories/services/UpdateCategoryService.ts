import Category from '../infra/typeorm/entities/Category';
import AppError from '@shared/errors/AppError';
import ICategoryRepository from '../repositories/ICategoryRepository';
import { inject, injectable } from 'tsyringe';

interface Request {
  id: string;
  name: string;
  slug: string;
}

@injectable()
class UpdateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoryRepository,
  ) {}

  public async execute({ id, name, slug }: Request): Promise<Category> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) throw new AppError('Publicação não encontrada', 401);

    if (category.name !== name) {
      category.name = name;
    }

    if (category.slug !== slug) {
      category.slug = slug;
    }

    await this.categoriesRepository.save(category);

    return category;
  }
}

export default UpdateCategoryService;
