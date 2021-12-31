export const shipper = {
    namespaced: true,
    state: {
      isLoading: false
    },
    mutations: {
      ['setLoading'](state, payload) {
        state.isLoading = payload;
      }
    }
  };
  