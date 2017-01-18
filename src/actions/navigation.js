import routes from '../constants/routes'

export const complete = () => {
  return {
    type: 'NAVIGATION/COMPLETE',
    location: routes.lookup(window.location.hash.substr(1)),
  }
}
