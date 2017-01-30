import config from '../config';

export const bucketPath = bucket => {
  return `https://${bucket}.s3.amazonaws.com`;
}

export const profilePicturePath = (user, size) => {
  if(!user.picture) return undefined;
  if(user.picture && user.picture.raw) return rawProfilePicturePath(user.picture.key);

  return `${bucketPath(config.s3.bucket)}/${config.s3.profile_pictures}/${user._id}/${user.picture}_${size}.jpg`;
}

export const rawProfilePicturePath = key => {
  return `${bucketPath(config.s3.bucket)}/${key}`;
}
