import uniloc from 'uniloc'

export default uniloc({ 
  root: 'GET /',
  home: 'GET /home',
  auth: 'GET /auth',
  reset_password: 'GET /reset_password',
  list: 'GET /list/:id',
  user: 'GET /user/:id',
  search: 'GET /search'
})
