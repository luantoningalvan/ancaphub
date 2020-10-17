import Category from '../infra/typeorm/entities/Category';
import ICategoryRepository from '../repositories/ICategoryRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ShowCategoriesService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoryRepository,
  ) {}

  public async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.findAll();

    return categories;
  }
}

export default ShowCategoriesService;
