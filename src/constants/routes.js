import uniloc from 'uniloc'

export default uniloc({ 
  root: 'GET /',
  home: 'GET /home',
  auth: 'GET /auth',
  list: 'GET /list/:id',
  user: 'GET /user/:id',
  search: 'GET /search'
})
