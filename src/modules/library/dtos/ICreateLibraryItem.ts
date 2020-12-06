export default interface ICreateLibraryItemDTO {
  title: string;
  author_id: string;
  cover?: string;
  type: string;
  contributor_id?: string;
  status?: 'pending';
}
