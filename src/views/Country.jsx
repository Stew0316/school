import Title from "@/layout/Title";
import style from "@/style/Country.module.scss"
import SchoolTable from "@/components/SchoolTable";
import { useState } from "react";
const Country = () => {
  const [tableData, setTableData] = useState([])
  return <div className={style.country}>
    <div className="left">
      <div>
        <Title text="TOP院校销售额排名"></Title>
        <SchoolTable data={tableData} lineHeight={30}></SchoolTable>
      </div>

    </div>
    <div>

    </div>
    <div>

    </div>
  </div>
}

export default Country