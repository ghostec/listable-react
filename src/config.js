const dev = {
  apiURL: '//192.168.1.8:3000/api',
  apiVersion: 'v1',
  s3: {
    bucket: 'listable-dev',
    raw_profile_pictures: 'raw/profile_pictures',
    profile_pictures: 'profile_pictures'
  }
};

const prd = {
  apiURL: `${process.env.apiURL}/api`,
  apiVersion: 'v1',
  s3: {
    bucket: 'listable-prd',
    raw_profile_pictures: 'raw/profile_pictures',
    profile_pictures: 'profile_pictures'
  }
};

export default (process.env.ENV === 'dev' ? dev : prd);
