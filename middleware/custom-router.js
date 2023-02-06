export default function (context) {
  context.app.router.beforeEach((to, from, next) => {
    console.log('from router', to, from);
    if (context.store.getters.getSearchNavStatus) {
      context.store.dispatch('searchNavToggle', { searchState: false });
    }
    if (
      from.path === '/poslanci/' &&
      to.path === '/poslanci/' &&
      Object.keys(to.query).length === 0
    ) {
      console.log('from router: to', to);
      context.store.dispatch('resetPoslanci');
    }

    next();
    return true;
  });
}
