export default function ({ app, route, from, store, redirect }) {
    app.router.beforeEach(() => {
       store.dispatch("searchNavToggle", false);
    });
}
