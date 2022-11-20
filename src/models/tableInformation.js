// model information for redux which saves table number details

export const tableInformation = {
    state: {
        savedTableNumber: null,
    },
    reducers: {
        setSavedTableNumber(state, payload) {
            return { ...state, savedTableNumber: payload };
        }
    }
}