const Tooltip = ({ x, y, showExpand, schoolCount, sales, area, expandCount }) => {
  return <div className="map-tooltip" style={{
    '--left': x + 'px',
    '--top': y + 'px'
  }}>
    <div className="map-tooltip-content">
      <div className="area">{area}</div>
      <div className="school-count">学校数量：{schoolCount}</div>
      <div className="school-count">销售额（W）：{sales}</div>
      {
        showExpand && <div className="school-count">未拓展学校数量（所）：{expandCount}</div>
      }
    </div>
  </div>
}

export default Tooltip