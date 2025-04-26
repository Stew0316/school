const SchoolTable = ({ data, lineHeight, className }) => {
  return <div className={`school-table ${className}`} style={{ '--line-height': `${lineHeight}px` }}>
    <div className="header">
      <span>院校</span>
      <span>销售额度</span>
      <span>排名</span>
    </div>
    <div className="school-list school-scroll">
      {
        data.map((item, index) => {
          return <div className="school-item" key={index}>
            <span className="name"><span>{item.name}</span></span>
            <span className="count">{item.count}</span>
            <span>{item.rank}</span>
          </div>
        })
      }
    </div>
  </div>
}

export default SchoolTable