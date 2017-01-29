import config from '../config';

export const profilePicturePath = user => {
  if(!user.picture) return undefined;
  const bucket = `https://${config.s3.bucket}`;
  return `${bucket}/${config.s3.profile_pictures}/${user._id}/${user.picture}`;
}
