import { useEffect, useMemo, useState } from 'react'
import swal from 'sweetalert'
import { RadioGroup, Radio } from '@palmerhq/radio-group'
import '@palmerhq/radio-group/styles.css' // use the default styles

import './App.css'

const board = Array.from({ length: 12 })
const piecesBoard = Array.from({ length: 13 })

const initPieces = () =>
  piecesBoard.map((_1, yi) =>
    piecesBoard.map((_2, xi) => ({
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
  Rest
}

function App() {
  const [pieces, setPieces] =
    useState<{ top: number; left: number; bg: Piece }[][]>(initPieces)

  const [currentPiece, setCurrentPiece] = useState(Piece.Empty)
  const [currentStatus, setCurrentStatus] = useState<Status>(Status.Begin)

  function fail(y: number, x: number) {
    if (pieces[y][x].bg) {
      return
    }
  }

  function begin() {
    setCurrentStatus(Status.Select)
  }

  function Select(value: Piece) {
    setCurrentPiece(value)
    setCurrentStatus(Status.Rest)
  }

  function rest() {
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
          <RadioGroup
            labelledBy="选择先手"
            value={currentPiece}
            onChange={Select}
          >
            <Radio value={Piece.Black}>黑子</Radio>
            <Radio value={Piece.White}>白子</Radio>
          </RadioGroup>
        )

      case Status.Rest:
        return (
          <span className="text-#fff underline" onClick={() => rest()}>
            重置
          </span>
        )

      default:
        return
    }
  }, [currentStatus])

  return (
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
      </div>
    </div>
  )
}

export default App
