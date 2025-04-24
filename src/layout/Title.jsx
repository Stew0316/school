import titleImg from "@/assets/title.png"
import style from "@/style/Title.module.scss"
const Title = ({ text, className }) => {
  return <div className={`${style.title} ${className}`}>
    <span className="text">{text}</span>
    <img src={titleImg} alt="" />
  </div>
}

export default Title