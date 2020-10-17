import AppError from '@shared/errors/AppError';
import ICategoryRepository from '../repositories/ICategoryRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class RemoveCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoryRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) throw new AppError('Categoria não encontrada', 401);

    this.categoriesRepository.remove(category.id);
    return;
  }
}

export default RemoveCategoryService;
