import { useState, useEffect } from "react"
import emit from "@/utils/emit.js"
const HeadName = ({ className }) => {
  const [name, setName] = useState('京东校园云全国大数据中台')
  useEffect(() => {
    emit.on('setName', data => {
      setName(data)
    })
  }, [])
  return <div className={className}>
    <div className="text">{name}</div>
  </div>
}

export default HeadName