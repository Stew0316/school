const Tooltip = ({ x, y, showExpand, school_count, month_sale, area, started_num, tipClick }) => {
  return <div className="map-tooltip" onClick={() => tipClick?.()} style={{
    '--left': x + 'px',
    '--top': y + 'px'
  }}>
    <div className="map-tooltip-content">
      <div className="area">{area}</div>
      <div className="school-count">学校数量：{school_count}</div>
      <div className="school-count">销售额（W）：{month_sale}</div>
      {
        showExpand && <div className="school-count">实训人数：{started_num}</div>
      }
    </div>
  </div>
}

export default Tooltip