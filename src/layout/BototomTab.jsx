import goleft from "@/assets/go-left.png"
import goright from "@/assets/go-right.png"
import { regionProvinceTree } from "@/api/req"
import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router"
import emit from "@/utils/emit.js"
import store from "@/store/school"
import { observer } from "mobx-react"
const BottomTab = () => {
  const [areaList, setAreaList] = useState([])
  const nav = useNavigate()
  const wrap = useRef()
  const scr = (val) => {
    wrap.current.scrollBy({ left: val, behavior: 'smooth' });
  }
  const goArea = (item) => {
    store.updateSelectArea(item.id)
    store.updateSelectAreaName(item.name)
    store.updateName(`京校园云${item.name}大数据中台`)
    if (item.id != -1) {
      nav('/area')
    } else {
      nav('/')
    }
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
      setAreaList([{ name: '全国', id: -1, sub_provinces: [] }, ...list])
    })
  }, [])
  return <div className="bot-tab">
    <img src={goleft} alt="" onClick={() => scr(-110)} />
    <div className="bot-wrap" ref={wrap}>
      {
        areaList.map((item, index) => {
          return <div className={store.selectArea == item.id ? 'active' : ''} onClick={() => goArea(item)}>{item.name}</div>
        })
      }
    </div>
    <img src={goright} onClick={() => scr(110)} alt="" />
  </div>
}

export default observer(BottomTab)