import Slider from './Slider'
import store from '@/store/school'
import { useNavigate } from 'react-router'
const SchoolTable = ({ data, lineHeight, className, slidesPerView = 6, slideClassName }) => {
  const nav = useNavigate()
  const goSchool = item => {
    store.updateName(item.school_name)
    store.updateSchoolId(item.school_id)
    nav('/school')
  }
  return <div className={`school-table ${className}`} style={{ '--line-height': `${lineHeight}px` }}>
    <div className="header">
      <span>院校</span>
      <span>销售额度</span>
      <span>排名</span>
    </div>
    <div >
      <Slider slidesPerView={slidesPerView} className={slideClassName} data={data} slideClassName='school-item' renderSlide={(item) => {
        return <div onClick={() => goSchool(item)}>
          <span className="name"><span>{item.school_name}</span></span>
          <span className="count">{item.month_sale}</span>
          <span>{item.rank}</span>
        </div>
      }}></Slider>
    </div>
  </div>
}

export default SchoolTable