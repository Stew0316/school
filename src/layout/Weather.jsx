import weatherImg from "@/assets/weather.png"
import wind from "@/assets/wind.png"
import pm from "@/assets/pm.png"
import { useState } from "react"
const Weather = ({ className }) => {
  const [temp, setTemp] = useState('~')
  return <div className={className}>
    <div className="wea-item">
      <img src={weatherImg} alt="" />
      <div className="wea-desc">
        <div>{temp}­°C</div>
        <div>温度</div>
      </div>
    </div>
    <div className="wea-item">
      <img src={wind} alt="" />
      <div className="wea-desc">
        <div>{temp}­级别</div>
        <div>风力</div>
      </div>
    </div>
    <div className="wea-item">
      <img src={pm} alt="" />
      <div className="wea-desc">
        <div>{temp}­</div>
        <div>空气质量</div>
      </div>
    </div>
  </div>
}

export default Weather