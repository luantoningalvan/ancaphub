import { Request, Response } from 'express';

import IndexSearchService from '@modules/search/services/IndexSearchService';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

class SearchController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { term } = request.query;

    const indexSearch = container.resolve(IndexSearchService);
    const results = await indexSearch.execute(term as string);

    return response.json(classToClass(results));
  }
}

export default SearchController;
