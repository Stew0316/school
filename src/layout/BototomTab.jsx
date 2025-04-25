import goleft from "@/assets/go-left.png"
import goright from "@/assets/go-right.png"
const BottomTab = () => {
  return <div className="bot-tab">
    <img src={goleft} alt="" />
    <div className="bot-wrap">
      <div>全国</div>
      <div className="active">华中地区</div>
      <div>华东地区</div>
      <div>华北地区</div>
      <div>西北地区</div>
    </div>
    <img src={goright} alt="" />
  </div>
}

export default BottomTab