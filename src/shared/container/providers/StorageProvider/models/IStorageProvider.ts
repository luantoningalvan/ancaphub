export default interface IStorageProvider {
  saveFile(
    file: string,
    crop: { x: number; y: number; h: number; w: number }
  ): Promise<string>;
  deleteFile(file: string): Promise<void>;
}
