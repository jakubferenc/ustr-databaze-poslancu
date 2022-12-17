export const poslanciFilterMixin =  {

  data() {
    return {
      currentQueryStringified: "",
      currentFilterSettings: {},
      defaultFilterSettings: {},
      defaultFilterData: {
        PoslaneckySlib: [true, false],
        Pohlavi: [1, 2],
      },
      currentFilterData: {},
      currentQuery: {},

    };
  },

  methods: {
    async refreshSelectedFiltersHandler($event) {
      const activeFilterItems = $event;

      this.currentQuery = {
        ...this.defaultQuery,
        ...this.currentQuery,
        ...activeFilterItems,
      };

      Object.keys(this.currentQuery).forEach((paramKey) => {
        if (this.currentQuery[paramKey].includes(null)) {
          delete this.currentQuery[paramKey];
        }
      });

      // // call API
      await this.prepareRequestFilteredViaAPI(this.currentQuery);
    },

  }
}
