import { useMemo } from "react"

const Num = ({ data }) => {
  const list = useMemo(
    () => {
      let str = String(data);
      return str.split('')
    },
    [data]
  )
  return <div className="numbers">
    {
      list.map(item => {
        return <div>
          {item}
        </div>
      })
    }
  </div>
}

export default Num