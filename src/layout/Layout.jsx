import style from "@/style/Layout.module.scss"
import Timer from "./Timer"
const Layout = ({ children }) => {
  return <div className={style.Layout}>
    <div className="pos-left"></div>
    <div className="pos-right"></div>
    <Timer></Timer>
    {children}
  </div>
}

export default Layout