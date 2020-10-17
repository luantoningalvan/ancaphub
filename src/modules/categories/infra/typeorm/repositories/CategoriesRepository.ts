import { getRepository, Repository } from 'typeorm';
import Category from '../entities/Category';
import ICategoryRepository from '@modules/categories/repositories/ICategoryRepository';
import ICreateCategoryDTO from '@modules/categories/dtos/ICreateCategoryDTO';
import AppError from '@shared/errors/AppError';

class CategoriesRepository implements ICategoryRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async findAll(): Promise<Category[]> {
    const user = await this.ormRepository.find();
    return user;
  }

  public async findById(id: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne(id);

    if (!category) throw new AppError('Categoria não encontrada', 404);

    return category;
  }

  public async create(postData: ICreateCategoryDTO): Promise<Category> {
    const user = this.ormRepository.create(postData);
    await this.ormRepository.save(user);

    return user;
  }

  public async save(category: Category): Promise<Category> {
    return this.ormRepository.save(category);
  }

  public async remove(category: string): Promise<void> {
    await this.ormRepository.delete(category);
  }
}

export default CategoriesRepository;
