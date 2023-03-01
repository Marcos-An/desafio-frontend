import { getVideosOnSearch } from '@api/getVideosSearch'
import { onChangeSearch, onChangeHistoric } from '@redux/features/search'
import {
  handleLoading,
  onChangeVideos,
  onCleanVideos
} from '@redux/features/videos'
import { RootState } from '@redux/store'
import { useRouter } from 'next/router'
import { ClockCounterClockwise, MagnifyingGlass } from 'phosphor-react'
import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useState
} from 'react'
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

  const onSearchVideos = async () => {
    dispatch(handleLoading(true))
    handleSearchHistoric()
    dispatch(onCleanVideos())
    getVideosOnSearch(searchInput)
      .then((res) => {
        dispatch(onChangeVideos(res))
        dispatch(handleLoading(false))
      })
      .catch(() => {
        dispatch(handleLoading(false))
      })
    router.push('/')
  }

  const onSelectHistoricSearch = (historic: string) => {
    dispatch(handleLoading(true))
    dispatch(onCleanVideos())
    dispatch(onChangeSearch(historic))
    getVideosOnSearch(historic)
      .then((res) => {
        dispatch(onChangeVideos(res))
        dispatch(handleLoading(false))
      })
      .catch(() => {
        dispatch(handleLoading(false))
      })
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchVideos()
      document.getElementById('input-search')?.blur()
    }
  }

  return (
    <div className={styles.container}>
      <input
        id="input-search"
        className={styles.input}
        placeholder="Pesquisar"
        value={searchInput}
        onKeyDown={handleKeyDown}
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
              onMouseDown={(
                e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
              ) => {
                e.stopPropagation()
                onSelectHistoricSearch(item)
              }}
            >
              <ClockCounterClockwise size={20} />
              <h5>{item}</h5>

              <span
                onMouseDown={(
                  e: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>
                ) => {
                  e.stopPropagation()
                  onRemoveSearchHistoric(index, e)
                }}
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
