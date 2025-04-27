import goleft from "@/assets/go-left.png"
import goright from "@/assets/go-right.png"
import { regionProvinceTree } from "@/api/req"
import { useState, useEffect, useRef } from "react"
const BottomTab = () => {
  const [areaList, setAreaList] = useState([])
  const wrap = useRef()
  const scr = (val) => {
    console.log(wrap.current)
    wrap.current.scrollBy({ left: val, behavior: 'smooth' });
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
          return <div>{item.name}</div>
        })
      }
    </div>
    <img src={goright} onClick={() => scr(110)} alt="" />
  </div>
}

export default BottomTab