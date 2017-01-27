import * as config from '../config';

export const profilePicturePath = key => {
  return (!key ? undefined : `${config.s3.profile_pictures}/${key}}`);
}
