const dev = {
  apiURL: '//192.168.1.3:3000/api',
  apiVersion: 'v1'
};

const prd = {
  apiURL: `${process.env.apiURL}/api`,
  apiVersion: 'v1',
};

export default (process.env.ENV === 'dev' ? dev : prd);
