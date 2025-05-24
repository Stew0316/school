import style from "@/style/Layout.module.scss"
import Timer from "./Timer"
import HeadName from "./HeadName"
import Weather from "./Weather"
const Layout = ({ children }) => {
  return <div className={style.Layout}>
    <div className="pos-left"></div>
    <div className="pos-right"></div>
    <div className="head-left"></div>
    <div className="head-right"></div>
    <HeadName className="head-name"></HeadName>
    <Timer className="head-timer"></Timer>
    {/* <Weather className="head-weather"></Weather> */}
    {children}
    <div className="bottom"></div>
  </div>
}

export default Layout