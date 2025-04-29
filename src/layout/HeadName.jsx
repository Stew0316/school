import { useState, useEffect } from "react"
import emit from "@/utils/emit.js"
import store from "@/store/school"
import { observer } from "mobx-react"
const HeadName = ({ className }) => {
  console.log('1111 act')
  return <div className={className}>
    <div className="text">{store.name}</div>
  </div>
}

export default observer(HeadName)