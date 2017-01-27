const dev = {
  apiURL: '//192.168.1.3:3000/api',
  apiVersion: 'v1',
  s3: {
    raw_profile_pictures: 'dev/raw_profile_pictures',
    profile_pictures: 'dev/profile_pictures'
  }
};

const prd = {
  apiURL: `${process.env.apiURL}/api`,
  apiVersion: 'v1',
  s3: {
    raw_profile_pictures: 'raw_profile_pictures',
    profile_pictures: 'profile_pictures'
  }
};

export default (process.env.ENV === 'dev' ? dev : prd);
