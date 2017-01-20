export default (path) => {
  window.location.replace(
    window.location.pathname + window.location.search + "#" + path 
  );
};
