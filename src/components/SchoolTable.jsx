import Slider from './Slider'

const SchoolTable = ({ data, lineHeight, className }) => {
  const goSchool = item => {
    console.log(item)
  }
  return <div className={`school-table ${className}`} style={{ '--line-height': `${lineHeight}px` }}>
    <div className="header">
      <span>院校</span>
      <span>销售额度</span>
      <span>排名</span>
    </div>
    <div >
      <Slider className='school-list' data={data} slideClassName='school-item' renderSlide={(item) => {
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