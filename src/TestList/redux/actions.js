
export const getListData = (pageNum) => {
  return ({
    type: "fetch_data",
    payload: { pageNum }
  })
}

export const deleteListItem = (index) => {
  return ({
    type: "delete_item",
    payload: { index }
  })
}