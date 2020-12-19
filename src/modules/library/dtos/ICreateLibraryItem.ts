export default interface ICreateLibraryItemDTO {
  title: string;
  author_id: string;
  cover?: string;
  type: string;
  content: string;
  contributor_id?: string;
  video_url?: string;
  status?: 'pending';
}
