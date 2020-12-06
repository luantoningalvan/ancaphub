import ProfileType from '../enums/ProfileType';

/**
 * Data transfer object for creating a new profile
 */
export default interface ICreateProfileDTO {
  user?: string;

  avatar?: string;

  title: string;

  handle: string;

  type: ProfileType;
}
