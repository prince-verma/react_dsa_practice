


export const reducer = (action, state) => {
  switch (action.type) {
    case "fetch_data":
      return {
        ...state,
        isLoading: true
      }
    case "fetch_data_Success": {
      return {
        ...state,
        isLoading: false,
        listData: [...state.listData, action.payload]
      }
    }
    case "delete_item": {
      state.listData.splice(action.payload.index, 1)
      return {
        ...state,
        listData: [...state.listData]
      }
    }
    default:
      return state
  }
}