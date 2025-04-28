import goleft from "@/assets/go-left.png"
import goright from "@/assets/go-right.png"
import { regionProvinceTree } from "@/api/req"
import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router"
import emit from "@/utils/emit.js"
const BottomTab = () => {
  const [areaList, setAreaList] = useState([])
  const nav = useNavigate()
  const wrap = useRef()
  const scr = (val) => {
    wrap.current.scrollBy({ left: val, behavior: 'smooth' });
  }
  const goArea = (item) => {
    emit.emit('setName', `京校园云${item.name}大数据中台`)
    nav('/area')
  }
  useEffect(() => {
    regionProvinceTree().then(res => {
      let list = []
      for (let i in res.data) {
        let item = res.data[i]
        let obj = {
          name: i,
          id: item.region_id,
          sub_provinces: item.sub_provinces
        }
        list.push(obj)
      }
      setAreaList(list)
    })
  }, [])
  return <div className="bot-tab">
    <img src={goleft} alt="" onClick={() => scr(-110)} />
    <div className="bot-wrap" ref={wrap}>
      {
        areaList.map((item, index) => {
          return <div onClick={() => goArea(item)}>{item.name}</div>
        })
      }
    </div>
    <img src={goright} onClick={() => scr(110)} alt="" />
  </div>
}

export default BottomTab