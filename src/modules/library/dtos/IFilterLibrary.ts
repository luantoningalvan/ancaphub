export default interface IFilterLibraryDTO {
  page_size: number;
  current_page: number;
  order_by: 'ASC' | 'DESC';
  type?: string;
  author_id?: string;
  category_id?: string;
}
