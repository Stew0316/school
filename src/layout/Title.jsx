import titleImg from "@/assets/title.png"
import style from "@/style/Title.module.scss"
const Title = ({ text }) => {
  return <div className={`${style.title}`}>
    <span className="text">{text}</span>
    <img src={titleImg} alt="" />
  </div>
}

export default Title