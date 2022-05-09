import { Fragment, useMemo, useState } from 'react'
import { RadioGroup, Dialog, Transition } from '@headlessui/react'
import './App.css'

const { Label, Option } = RadioGroup

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
  const [pieces, setPieces] =
    useState<
      { top: number; left: number; y: number; x: number; bg: Piece }[][]
    >(initPieces)

  const [currentPiece, setCurrentPiece] = useState(Piece.Empty)
  const [currentStatus, setCurrentStatus] = useState<Status>(Status.Begin)
  const [isOpen, setIsOpen] = useState(false)

  function fail(y: number, x: number) {
    if (pieces[y][x].bg || currentStatus !== Status.Rest) {
      return
    }
    pieces[y][x].bg = currentPiece
    setPieces(pieces.slice())
    if (judge()) {
      setIsOpen(true)
      setCurrentStatus(Status.Win)
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
      console.log(bg)

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
          console.log(pieces[yc]?.[xc]?.bg, yc, xc, i, dir)

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

  function Select(value: Piece) {
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
          <>
            <RadioGroup value={currentPiece} onChange={Select}>
              <Label className="sr-only">请选择</Label>
              <div className="space-y-2">
                <Option
                  value={Piece.Black}
                  className="relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none"
                >
                  <span className="text-#456">黑棋</span>
                </Option>
                <Option
                  value={Piece.White}
                  className="relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none"
                >
                  <span className="text-#456">白棋</span>
                </Option>
              </div>
            </RadioGroup>
          </>
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
    return (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed absolute bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed absolute overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {currentPiece === Piece.Black ? '黑棋' : '白棋'}获胜！！！
                    </p>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mr-2"
                      onClick={() => rest()}
                    >
                      重置
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setIsOpen(false)}
                    >
                      确定
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    )
  }, [isOpen, currentPiece])

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
        {dialog}
      </div>
    </div>
  )
}

export default App
