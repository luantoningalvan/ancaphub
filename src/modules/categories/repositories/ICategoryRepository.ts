import Category from '../infra/typeorm/entities/Category';
import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';

interface ICategoryRepository {
  findAll(): Promise<Category[]>;
  findById(id: string): Promise<Category | undefined>;
  create(data: ICreateCategoryDTO): Promise<Category>;
  save(data: Category): Promise<Category>;
  remove(id: string): void;
}

export default ICategoryRepository;
