import { useEffect, useMemo, useState } from 'react'
import './App.css'

interface CheckerboardData {
  position: [number, number]
  style: {
    top: number
    left: number
    opacity: Status
    backgroundColor: Player
  }
}

const checkerboard = Array.from({ length: 20 })

const genCheckerboardData = (): CheckerboardData[][] => {
  const temp = Array.from({ length: 21 })

  return temp.map((i1, yIdx) =>
    temp.map((i2, xIdx) => ({
      position: [xIdx, yIdx],
      style: {
        top: yIdx * 27 - 6,
        left: xIdx * 27 - 6,
        opacity: Status.hide,
        backgroundColor: Player.white
      }
    }))
  )
}

const enum Player {
  white = 'white',
  black = 'black'
}

const enum Status {
  hide,
  show
}

function App() {
  const [begin, setBegin] = useState(true)
  const [currentPlayer, setCurrentPlayer] = useState(Player.white)
  const [currentPosition, setCurrentPosition] = useState<[number, number]>([
    0, 0
  ])
  const [checkerboardData, setCheckerboardData] =
    useState<CheckerboardData[][]>(genCheckerboardData)

  const table = useMemo(
    () => (
      <table>
        <tbody>
          {checkerboard.map((i1, trIdx) => (
            <tr key={trIdx}>
              {checkerboard.map((i2, tdIdx) => (
                <td key={tdIdx}></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    ),
    []
  )

  const keep = (style: CheckerboardData['style']) =>
    style.opacity === Status.show && style.backgroundColor === currentPlayer

  const judge = () => {
    const [x, y] = currentPosition
    // 横
    let start = x - 4 < 0 ? 0 : x - 4
    let end = x + 4 > 20 ? 20 : x + 4
    let count = 0
    for (let index = start; index <= end; index++) {
      if (keep(checkerboardData[y][index].style)) {
        if (++count === 5) {
          return true
        }
      } else {
        count = 0
      }
    }
    // 左斜
    count = 0
    let leftIncline = y - 4 < 0 ? 0 : y - 4
    for (let index = start; index <= end; index++) {
      if (
        !checkerboardData[leftIncline] ||
        !checkerboardData[leftIncline][index]
      )
        continue
      if (keep(checkerboardData[leftIncline++][index].style)) {
        if (++count === 5) {
          return true
        }
      } else {
        count = 0
      }
    }

    // 竖
    start = y - 4 < 0 ? 0 : y - 4
    end = y + 4 > 20 ? 20 : y + 4
    count = 0
    for (let index = start; index <= end; index++) {
      if (keep(checkerboardData[index][x].style)) {
        if (++count === 5) {
          return true
        }
      } else {
        count = 0
      }
    }

    // 右斜
    count = 0
    let rightIncline = x + 4 > 20 ? 20 : x + 4
    for (let index = start; index <= end; index++) {
      if (!checkerboardData[index] || !checkerboardData[index][index]) continue
      if (keep(checkerboardData[index][rightIncline--].style)) {
        if (++count === 5) {
          alert(`${currentPlayer}赢了`)
          return
        }
      } else {
        count = 0
      }
    }
    return false
  }

  const fall = (position: [number, number]) => {
    setBegin(false)
    const [x, y] = position
    checkerboardData[y][x].style = {
      ...checkerboardData[y][x].style,
      opacity: Status.show,
      backgroundColor: currentPlayer
    }

    setCheckerboardData([...checkerboardData])
    setCurrentPosition(position)
  }

  useEffect(() => {
    if (!begin) {
      if (judge()) {
        alert(`${currentPlayer}赢了`)
        setBegin(true)
        setCurrentPlayer(Player.white)
        setCheckerboardData(genCheckerboardData())
      } else {
        setCurrentPlayer(
          currentPlayer === Player.white ? Player.black : Player.white
        )
      }
    }
  }, [checkerboardData])

  return (
    <div className="container">
      {checkerboard.map((i, index) =>
        checkerboardData[index].map(({ position, style }) => (
          <div
            className="piece"
            key={position[0] + position[1]}
            style={style}
            onClick={() => fall(position)}
          />
        ))
      )}

      {table}
    </div>
  )
}

export default App
