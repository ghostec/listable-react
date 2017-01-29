import config from '../config';

export const bucketPath = bucket => {
  return `https://${bucket}.s3.amazonaws.com`;
}

export const profilePicturePath = user => {
  if(!user.picture) return undefined;
  return `${bucketPath(config.s3.bucket)}/${config.s3.profile_pictures}/${user._id}/${user.picture}`;
}

export const rawProfilePicturePath = key => {
  return `${bucketPath(config.s3.bucket)}/${key}`;
}
