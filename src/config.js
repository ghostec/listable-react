const dev = {
  apiURL: '//192.168.1.12:3000/api',
  apiVersion: 'v1',
  s3: {
    bucket: 'listable-dev',
    profile_pictures: 'profile_pictures'
  }
};

const prd = {
  apiURL: `${process.env.apiURL}/api`,
  apiVersion: 'v1',
  s3: {
    bucket: 'listable-prd',
    profile_pictures: 'profile_pictures'
  }
};

export default (process.env.ENV === 'dev' ? dev : prd);
