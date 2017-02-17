const dev = {
  rootPath: '/',
  apiURL: `//localhost:3000/api`,
  apiVersion: 'v1',
  s3: {
    bucket: 'listable-dev',
    raw_profile_pictures: 'raw/profile_pictures',
    profile_pictures: 'profile_pictures'
  }
};

const prd = {
  rootPath: '/',
  apiURL: `${process.env.apiURL}/api`,
  apiVersion: 'v1',
  s3: {
    bucket: 'listable-prd',
    raw_profile_pictures: 'raw/profile_pictures',
    profile_pictures: 'profile_pictures'
  }
};

export default (process.env.ENV === 'prd' ? prd : dev);
