export const isProfilePictureUpdated = (state_user, db_user) => {
  if(!(state_user && state_user.picture && state_user.picture.raw)) return true;

  const state_picture = state_user.picture.key.split('/').pop().split('.')[0];
  const db_picture = db_user.picture;

  return (state_picture != db_picture ? false: true);
}

export const setProfilePictureInDbUser = (state_user, db_user) => {
  db_user.picture = state_user.picture;
  return db_user;
}
