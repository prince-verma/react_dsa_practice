import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteListItem, getListData } from "../redux/actions";




const PAGE_LIMIT = 10

export function useListData(limit = PAGE_LIMIT) {
  const dispatch = useDispatch()
  // const [currentPage, updatePage] = useState(0);
  const currentPage = useRef(0)
  const totalPages = useRef(100)

  const { isLoading, listData } = useSelector(state => {
    return state.listData
  })

  // const isLoading = useSelector(state => {
  //   return state.listData.loading
  // })

  // const listData = useSelector(state => {
  //   return state.listData.listData
  // })

  const getData = useCallback(() => {
    dispatch(getListData(currentPage.current, limit))
  }, [dispatch])

  useEffect(() => {
    getData()
  }, [])

  const refreshPage = useCallback(() => {
    currentPage.current = 0
    getData()
  }, [getData])

  const loadMoreData = useCallback(() => {
    if (currentPage.current < totalPages.current / PAGE_LIMIT) {
      currentPage.current++
      getData()
    }
  }, [getData])

  const deleteItem = useCallback((index) => {
    dispatch(deleteListItem(index))
  }, [dispatch])

  return {
    isLoading,
    listData,
    loadMoreData,
    refreshPage
  }
}


class DebouncedContentHandler {
  data = "";
  timeout = null;
  constructor(cb, time = 100) {
    this.cb = cb
    this.time = time
  }

  handleContent(chunk) {
    if (this.timeout) clearTimeout(this.timeout)
    this.data += chunk
    this.timeout = setTimeout(() => {
      this.cb(this.data)
      this.timeout = null
    }, 100)
  }

}

const useMessageQueue = () => {
  const [message, setMesage] = useState()
  const timeout = useRef(null)

  useEffect(() => {
    // ....socketconn
    const messageHandle = new DebouncedContentHandler((data) => {
      setMesage(mes => {
        return mes + data
      })
    }, 100)
  }, [])



}
