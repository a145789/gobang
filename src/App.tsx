import { useEffect, useMemo, useState, useTransition } from 'react'
import { createPortal } from 'react-dom'
import './App.css'
import WeatherSunny16Regular from '@ricons/fluent/WeatherSunny16Regular'
import WeatherMoon28Filled from '@ricons/fluent/WeatherMoon28Filled'
import { Icon } from '@ricons/utils'

const board = Array.from({ length: 12 })
const piecesBoard = Array.from({ length: 13 })

const initPieces = () =>
  piecesBoard.map((_1, yi) =>
    piecesBoard.map((_2, xi) => ({
      y: yi,
      x: xi,
      top: yi * 28 - 7,
      left: xi * 28 - 7,
      bg: Piece.Empty
    }))
  )

const enum Piece {
  Empty = '',
  Black = 'bg-#000',
  White = 'bg-#fff'
}

const enum Status {
  Begin,
  Select,
  Rest,
  Win
}

function App() {
  const [isDark, setIsDark] = useState(false)

  const [pieces, setPieces] =
    useState<
      { top: number; left: number; y: number; x: number; bg: Piece }[][]
    >(initPieces)

  const [currentPiece, setCurrentPiece] = useState(Piece.Empty)
  const [currentStatus, setCurrentStatus] = useState<Status>(Status.Begin)
  const [isOpen, setIsOpen] = useState(false)

  const [, setTransition] = useTransition()

  function fail(y: number, x: number) {
    if (pieces[y][x].bg || currentStatus !== Status.Rest) {
      return
    }
    pieces[y][x].bg = currentPiece
    setTransition(() => setPieces(pieces.slice()))
    if (judge()) {
      setCurrentStatus(Status.Win)
      setTimeout(() => {
        setIsOpen(true)
      }, 200)
      return
    }
    setCurrentPiece(currentPiece === Piece.Black ? Piece.White : Piece.Black)
  }

  function judge() {
    const have = pieces.flat().filter(p => p.bg)
    if (have.length < 9) {
      return
    }
    return have.some(({ y, x, bg }) => {
      let i = 0
      let dir = 1
      let yc = y
      let xc = x
      while (i < 4) {
        switch (dir) {
          case 1:
            xc--
            break
          case 2:
            yc--
            xc--
            break
          case 3:
            yc--
            break
          case 4:
            xc++
            yc--
            break
          case 5:
            xc++
            break
          case 6:
            yc++
            xc++
            break
          case 7:
            yc++
            break
          case 8:
            xc--
            yc++
            break

          default:
            break
        }

        if (pieces[yc]?.[xc]?.bg === bg) {
          if (++i === 4) {
            return true
          }
        } else if (++dir === 9) {
          return
        } else {
          i = 0
          yc = y
          xc = x
        }
      }
    })
  }

  function begin() {
    setCurrentStatus(Status.Select)
  }

  function choose(value: Piece) {
    setCurrentPiece(value)
    setCurrentStatus(Status.Rest)
  }

  function rest() {
    setIsOpen(false)
    setCurrentPiece(Piece.Empty)
    setCurrentStatus(Status.Begin)
    setPieces(initPieces())
  }

  const table = useMemo(
    () => (
      <table className="border-collapse border border-#442C21 w-336px h-336px">
        <tbody>
          {board.map((_1, trIdx) => (
            <tr key={trIdx}>
              {board.map((_2, tdIdx) => (
                <td className="border border-#FFFDFE" key={tdIdx} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    ),
    []
  )

  const handle = useMemo(() => {
    switch (currentStatus) {
      case Status.Begin:
        return (
          <span className="text-#fff underline" onClick={() => begin()}>
            开始
          </span>
        )

      case Status.Select:
        return (
          <div className="flex items-center">
            <div className="text-green-700 font-bold">选择先手：</div>
            <div
              onClick={() => choose(Piece.Black)}
              className="relative flex cursor-pointer rounded-lg shadow-md bg-lime-600 text-#fff flex justify-center items-center w-50px leading-9 mr-2"
            >
              黑棋
            </div>
            <div
              onClick={() => choose(Piece.White)}
              className="relative flex cursor-pointer rounded-lg shadow-md bg-lime-600 text-#fff flex justify-center items-center w-50px leading-9"
            >
              白棋
            </div>
          </div>
        )

      case Status.Rest:
      case Status.Win:
        return (
          <span className="text-#fff underline" onClick={() => rest()}>
            重置
          </span>
        )

      default:
        return
    }
  }, [currentStatus])

  const dialog = useMemo(() => {
    return createPortal(
      isOpen && (
        <div className="fixed h-full w-full top-0 z-50 overflow-hidden">
          <div className="absolute h-full w-full bg-gray-600" />
          <div className="absolute h-full w-full flex pt-200px justify-center">
            <div className="bg-#e4e1d1 dark:bg-#141e1b rounded-lg shadow-xl px-6 py-6 overflow-hidden w-200px h-140px">
              <h3 className="text-#f0aa9d dark:text-#d1d5db text-center">
                {currentPiece === Piece.Black ? '黑棋' : '白棋'}获胜
              </h3>
              <div className="mt-12 flex justify-around">
                <div
                  className="cursor-pointer bg-red-300 dark:bg-#444 text-light-50 w-60px h-40px dark:text-#eee flex justify-center items-center rounded-lg shadow-xl"
                  onClick={rest}
                >
                  重置
                </div>
                <div
                  className="cursor-pointer bg-red-300 dark:bg-#555 text-light-50 w-60px h-40px dark:text-#eee flex justify-center items-center rounded-lg shadow-xl"
                  onClick={() => setIsOpen(false)}
                >
                  确定
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      document.body
    )
  }, [isOpen, currentPiece])

  useEffect(() => {
    document.body.classList.toggle('dark', isDark)
  }, [isDark])

  return (
    <div className="w-full h-full bg-#D2B42C dark:bg-#141e1b transition duration-700 relative">
      <div
        className="absolute top-10 right-10"
        onClick={() => setIsDark(!isDark)}
      >
        <Icon size="36" color={isDark ? '#fff' : '#ddd '}>
          {isDark ? <WeatherMoon28Filled /> : <WeatherSunny16Regular />}
        </Icon>
      </div>

      <div className="w-full flex pt-130px flex-col items-center">
        <div className="relative">
          {pieces.map((item, yi) =>
            item.map(({ top, left, bg }, xi) => (
              <div
                className={`w-14px h-14px rounded-full absolute ${bg}`}
                key={xi}
                style={{ top, left }}
                onClick={() => fail(yi, xi)}
              />
            ))
          )}
          {table}

          <div className="flex justify-center mt-4">{handle}</div>
          {dialog}
        </div>
      </div>
    </div>
  )
}

export default App
