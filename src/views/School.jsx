import style from "@/style/School.module.scss"
import { useState, useMemo, useEffect } from "react"
import Num from "@/components/Num"
import Title from "@/layout/Title"
import { useNavigate } from "react-router"
import goBack from "@/assets/goback.png"
import people1 from "@/assets/people1.png"
import people2 from "@/assets/people2.png"
import people3 from "@/assets/people3.png"
import people4 from "@/assets/people4.png"
import { Image } from "antd"
import award from "@/assets/award.png"
const School = () => {
  const nav = useNavigate()
  const goBackArea = () => {
    nav("/area")
  }
  const [jobList, setJobList] = useState([
    {
      name: "库存岗位",
      people: "11",
    },
    {
      name: "库存岗位",
      people: "11",
    },
    {
      name: "库存岗位",
      people: "11",
    },
    {
      name: "库存岗位",
      people: "11",
    },
    {
      name: "库存岗位",
      people: "11",
    },
    {
      name: "库存岗位",
      people: "11",
    },
    {
      name: "库存岗位",
      people: "11",
    },
  ])
  return <div className={style.school}>
    <div className="left">
      <Title text="各专业实训人数"></Title>
      <div className="peoples">
        <div className="people-wrap">
          <img className="people-img" src={people1} alt="" />
          <div className="people-text">
            <div>11</div>
            <div>电子商务</div>
          </div>
        </div>
        <div className="people-wrap">
          <img className="people-img" src={people1} alt="" />
          <div className="people-text">
            <div>11</div>
            <div>电子商务</div>
          </div>
        </div>
        <div className="people-wrap">
          <img className="people-img" src={people1} alt="" />
          <div className="people-text">
            <div>11</div>
            <div>电子商务</div>
          </div>
        </div>
        <div className="people-wrap">
          <img className="people-img" src={people1} alt="" />
          <div className="people-text">
            <div>11</div>
            <div>电子商务</div>
          </div>
        </div>
      </div>
      <Title className="wrap-10" text="提供岗位动态分析"></Title>
      <div className={`headers ${jobList.length > 5 ? 'headers-scr' : ''}`}>
        <span>序号</span>
        <span>岗位名称</span>
        <span>人数</span>
      </div>
      <div className="table-wrap school-scroll">
        {
          jobList.map((item, index) => {
            return <div key={index} className={`table-item ${index % 2 == 0 ? "table-stripe" : ""}`}>
              <span>{index + 1}</span>
              <span>{item.name}</span>
              <span>{item.people}</span>
            </div>
          })
        }
      </div>
      <Title className="wrap-10" text="课程开发动态分析"></Title>
      <div className={`headers ${jobList.length > 5 ? 'headers-scr' : ''}`}>
        <span>序号</span>
        <span>课程名称</span>
        <span>数量</span>
      </div>
      <div className="table-wrap school-scroll">
        {
          jobList.map((item, index) => {
            return <div key={index} className={`table-item ${index % 2 == 0 ? "table-stripe" : ""}`}>
              <span>{index + 1}</span>
              <span>{item.name}</span>
              <span>{item.people}</span>
            </div>
          })
        }
      </div>
      <Title className="wrap-10" text="赛事成果动态分析"></Title>
      <div className="images">
        <Image src={award}></Image>
        <Image src={award}></Image>
        <Image src={award}></Image>
      </div>
    </div>
    <div className="center">

      <div className="center-data">
        <div className="center-data-item">
          <Num data={1200}></Num>
          <div className="center-data-text">年销售额（万元）</div>
        </div>
        <div className="center-data-item center-data-center">
          <Num data={2000}></Num>
          <div className="center-data-text">月销售额（万元）</div>
        </div>
        <div className="center-data-item">
          <Num data={4200}></Num>
          <div className="center-data-text">日销售额（万元）</div>
        </div>
      </div>
      <div className="china-map">

      </div>
      <div className="center-back">
        <div className="back">
          <img onClick={() => goBackArea()} src={goBack} alt="" />
          <span onClick={() => goBackArea()}>返回大区数据中台</span>
        </div>
        <div className="center-back-text">产业做大 专业做强</div>
      </div>
    </div>
    <div className="right">
      <Title className="text-yellow" text="线上销售额数据"></Title>
      <Title className="wrap-10 text-yellow" text="线下销售额数据"></Title>
      <Title className="wrap-10" text="TOP10岗位"></Title>
      <div className={`headers ${jobList.length > 5 ? 'headers-scr' : ''}`}>
        <span>岗位</span>
        <span>人数</span>
        <span>排名</span>
      </div>
      <div className="table-wrap school-scroll">
        {
          jobList.map((item, index) => {
            return <div key={index} className={`table-item ${index % 2 == 0 ? "table-stripe" : ""}`}>
              <span>{item.name}</span>
              <span>{item.people}</span>
              <span className={`${index < 3 ? 'school-coin' : ''}`}>{index + 1}</span>
            </div>
          })
        }
      </div>
      <Title className="wrap-10" text="创新创业的孵化成功"></Title>
      <div className="comp-name">
        <div className="lines">
          <div>企业名称</div>
          <div>企业名称</div>
        </div>
        <div className="lines line-stripe">
          <div>企业名称</div>
          <div>企业名称</div>
        </div>
        <div className="lines">
          <div>企业名称</div>
          <div>企业名称</div>
        </div>
        <div className="lines line-stripe">
          <div>企业名称</div>
          <div>企业名称</div>
        </div>
      </div>
    </div>
  </div>
}

export default School