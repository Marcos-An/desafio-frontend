import { getVideosOnSearch } from '@api/getVideosSearch'
import { onChangeSearch, onChangeHistoric } from '@redux/features/search'
import { onChangeVideos } from '@redux/features/videos'
import { RootState } from '@redux/store'
import { useRouter } from 'next/router'
import { ClockCounterClockwise, MagnifyingGlass } from 'phosphor-react'
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './inputSearch.module.scss'

export const InputSearch = () => {
  const router = useRouter()
  const [isSearching, setIsSearching] = useState(false)
  const searchInput = useSelector((state: RootState) => state.search.value)
  const searchHistoric = useSelector(
    (state: RootState) => state.search.historic
  )
  const dispatch = useDispatch()

  useEffect(() => {
    const newHistoric = JSON.parse(
      localStorage.getItem('localSearchHistoric') || '[]'
    )

    dispatch(onChangeHistoric(newHistoric))
  }, [])

  const handleSearchHistoric = () => {
    if (searchInput === '') {
      return
    }
    const newSet = new Set([
      searchInput,
      ...JSON.parse(localStorage.getItem('localSearchHistoric') || '[]')
    ])

    const newLocalSearch = Array.from(newSet)

    if (newLocalSearch.length > 10) {
      newLocalSearch.pop()
    }

    localStorage.setItem('localSearchHistoric', JSON.stringify(newLocalSearch))
    dispatch(onChangeHistoric(newLocalSearch))
  }

  const onRemoveSearchHistoric = (
    itemIndex: number,
    e: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation()
    const newHistoric = JSON.parse(
      localStorage.getItem('localSearchHistoric') || '[]'
    )

    newHistoric.splice(itemIndex, 1)

    localStorage.setItem('localSearchHistoric', JSON.stringify(newHistoric))
    dispatch(onChangeHistoric(newHistoric))
    setIsSearching(true)
  }

  const onSearchVideos = () => {
    router.push('/')
    handleSearchHistoric()
    getVideosOnSearch(searchInput).then((res) => {
      dispatch(onChangeVideos(res))
    })
  }

  const onSelectHistoricSearch = (
    historic: string,
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation()
    dispatch(onChangeSearch(historic))
    getVideosOnSearch(historic).then((res) => {
      dispatch(onChangeVideos(res))
    })
  }

  return (
    <div className={styles.container}>
      <input
        id="input-search"
        className={styles.input}
        placeholder="Pesquisar"
        value={searchInput && searchInput}
        onFocus={() => setIsSearching(true)}
        onBlur={() => setIsSearching(false)}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          dispatch(onChangeSearch(e.target.value))
        }}
      />
      <div className={styles.icon} onClick={onSearchVideos}>
        <MagnifyingGlass size={20} />
      </div>

      {isSearching && searchHistoric.length > 0 && (
        <div className={styles.historicContainer}>
          {searchHistoric.map((item, index) => (
            <div
              key={item}
              className={styles.historicItem}
              onClick={(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) =>
                onSelectHistoricSearch(item, e)
              }
            >
              <ClockCounterClockwise size={20} />
              <h5>{item}</h5>

              <span
                onMouseDown={(
                  e: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>
                ) => onRemoveSearchHistoric(index, e)}
              >
                Remover
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
