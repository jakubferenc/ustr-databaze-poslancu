export default function (context) {
  context.app.router.beforeEach((to, from, next) => {
    context.store.dispatch("searchNavToggle", {searchState: false});
    next();
    return true;
  });
}
