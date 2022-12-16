export default function (context) {
  context.app.router.beforeEach((to, from, next) => {
    context.store.dispatch("searchNavToggle", {searchState: false});
    console.log('from before each router');
    next();
    return true;
  });
}
