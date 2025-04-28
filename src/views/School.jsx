import style from "@/style/School.module.scss"
import { useState, useMemo, useEffect } from "react"
import { Progress } from "antd"
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
  const [courseList, setCourseList] = useState([
    { name: "Google AI 基础", people: 50 },  // Coursera 上 2024 最受欢迎企业课程 :contentReference[oaicite:0]{index=0}
    { name: "Python 入门", people: 45 },  // Class Central 热门编程课程榜单 Top 1 :contentReference[oaicite:1]{index=1}
    { name: "机器学习", people: 40 },  // Class Central 最受欢迎机器学习课程 :contentReference[oaicite:2]{index=2}
    { name: "数据科学专业化", people: 35 },  // Class Central 热门数据科学课程榜单 :contentReference[oaicite:3]{index=3}
    { name: "数字营销与电子商务", people: 30 },  // Coursera 热门营销课程 · 127K 评价 :contentReference[oaicite:4]{index=4}
    { name: "全栈 Web 开发", people: 25 },  // Class Central 热门编程路径推荐 :contentReference[oaicite:5]{index=5}
    { name: "项目管理专业证书", people: 20 },  // Coursera 热门项目管理课程 · 166K 评价 :contentReference[oaicite:6]{index=6}
    { name: "网络安全基础", people: 18 },  // Coursera 热门安全课程 · 50K 评价 :contentReference[oaicite:7]{index=7}
    { name: "图形设计基础", people: 15 },  // Class Central 热门艺术与设计课程榜单 :contentReference[oaicite:8]{index=8}
    { name: "个人高效习惯", people: 12 }   // HeightsPlatform 2024 个人发展趋势榜 Top 1 :contentReference[oaicite:9]{index=9}
  ])
  const [top10, setTop10] = useState([
    { name: "首席执行官", people: 150 },  // 企业最高决策者，常见于各大公司组织结构 :contentReference[oaicite:0]{index=0}
    { name: "首席运营官", people: 120 },  // 负责日常运营管理 :contentReference[oaicite:1]{index=1}
    { name: "首席财务官", people: 110 },  // 负责公司财务战略与风险控制 :contentReference[oaicite:2]{index=2}
    { name: "技术总监", people: 80 },  // 主管技术战略和研发团队 :contentReference[oaicite:3]{index=3}
    { name: "产品经理 ", people: 65 },  // 负责产品规划和落地 :contentReference[oaicite:4]{index=4}
    { name: "项目经理", people: 50 },  // 负责项目执行和进度管理 :contentReference[oaicite:5]{index=5}
    { name: "人力资源经理", people: 35 },  // 负责招聘、培训及员工关系 :contentReference[oaicite:6]{index=6}
    { name: "市场经理", people: 25 },  // 负责市场推广和品牌建设 :contentReference[oaicite:7]{index=7}
    { name: "软件工程师", people: 15 },  // 企业中最常见的技术岗位之一 :contentReference[oaicite:8]{index=8}
    { name: "数据分析师", people: 8 }    // 负责数据挖掘与可视化 :contentReference[oaicite:9]{index=9}
  ])
  const [lineData, setLineData] = useState([
    { name: "家庭保健", people: 14500 },  // Home Health and Personal Care Aides :contentReference[oaicite:0]{index=0}
    { name: "零售销售员", people: 13200 },  // Retail Salespersons :contentReference[oaicite:1]{index=1}
    { name: "收银员", people: 12000 },  // Cashiers :contentReference[oaicite:2]{index=2}
    { name: "普通文员", people: 10500 },  // Office Clerks, General :contentReference[oaicite:3]{index=3}
    { name: "总经理／运营经理", people: 9200 },   // General and Operations Managers :contentReference[oaicite:4]{index=4}
    { name: "快餐及柜台服务员", people: 8100 },   // Fast Food and Counter Workers :contentReference[oaicite:5]{index=5}
    { name: "注册护士", people: 6700 },   // Registered Nurses :contentReference[oaicite:6]{index=6}
    { name: "软件工程师", people: 5300 },   // Software Engineer :contentReference[oaicite:7]{index=7}
    { name: "数据分析师", people: 3900 },   // Data Analyst :contentReference[oaicite:8]{index=8}
    { name: "项目经理", people: 2500 }    // Project Manager :contentReference[oaicite:9]{index=9}
  ])
  const [offLineData, setOffLineData] = useState([
    { name: "国家电网有限公司", count: 98 },    // 榜首国企之一 :contentReference[oaicite:0]{index=0}
    { name: "中国石油化工集团有限公司", count: 91 }, // 中国500强第二 :contentReference[oaicite:1]{index=1}
    { name: "中国石油天然气集团有限公司", count: 87 }, // 中国500强第三 :contentReference[oaicite:2]{index=2}
    { name: "中国建筑集团有限公司", count: 82 },   // 中国500强第四 :contentReference[oaicite:3]{index=3}
    { name: "中国工商银行股份有限公司", count: 75 }, // 中国500强第五 :contentReference[oaicite:4]{index=4}
    { name: "中国建设银行股份有限公司", count: 68 }, // 中国500强第六 :contentReference[oaicite:5]{index=5}
    { name: "中国农业银行股份有限公司", count: 62 }, // 中国500强第七 :contentReference[oaicite:6]{index=6}
    { name: "中国移动通信集团有限公司", count: 55 }, // 中国500强中排名第16 
    { name: "中国平安保险（集团）股份有限公司", count: 47 }, // 中国500强第14 
    { name: "阿里巴巴（中国）有限公司", count: 33 },   // 民营企业500强第2 :contentReference[oaicite:7]{index=7}
    { name: "腾讯控股有限公司", count: 21 },        // 民营企业500强第6 :contentReference[oaicite:8]{index=8}
    { name: "华为投资控股有限公司", count: 10 }     // 民营企业500强第4 :contentReference[oaicite:9]{index=9}
  ])
  const [top50List, setTop50List] = useState(offLineData);
  const [jobList, setJobList] = useState([
    { name: "执业护士", people: 100 },  // TOP1 执业护士 :contentReference[oaicite:0]{index=0}
    { name: "财务经理", people: 89 },  // TOP2 财务经理 :contentReference[oaicite:1]{index=1}
    { name: "软件工程师", people: 78 },  // TOP3 软件工程师 :contentReference[oaicite:2]{index=2}
    { name: "IT 经理", people: 67 },  // TOP4 IT 经理 :contentReference[oaicite:3]{index=3}
    { name: "医师助理", people: 56 },  // TOP5 医师助理 :contentReference[oaicite:4]{index=4}
    { name: "医疗与健康服务经理", people: 45 },  // TOP6 医疗与健康服务经理 :contentReference[oaicite:5]{index=5}
    { name: "信息安全分析师", people: 34 },  // TOP7 信息安全分析师 :contentReference[oaicite:6]{index=6}
    { name: "数据科学家", people: 23 },  // TOP8 数据科学家 :contentReference[oaicite:7]{index=7}
    { name: "精算师", people: 22 },  // TOP9 精算师 :contentReference[oaicite:8]{index=8}
    { name: "语言病理学家", people: 20 }   // TOP10 语言病理学家 :contentReference[oaicite:9]{index=9}
  ])
  return <div className={style.school}>
    <div className="left">
      <Title text="各专业实训人数"></Title>
      <div className="peoples">
        <div className="people-wrap">
          <img className="people-img" src={people1} alt="" />
          <div className="people-text">
            <div className="text11">25500</div>
            <div>电子商务</div>
          </div>
        </div>
        <div className="people-wrap">
          <img className="people-img" src={people1} alt="" />
          <div className="people-text">
            <div className="text12">10077</div>
            <div>物流管理</div>
          </div>
        </div>
        <div className="people-wrap">
          <img className="people-img" src={people1} alt="" />
          <div className="people-text">
            <div className="text13">11007</div>
            <div>市场营销</div>
          </div>
        </div>
        <div className="people-wrap">
          <img className="people-img" src={people1} alt="" />
          <div className="people-text">
            <div className="text14">25520</div>
            <div>财务管理</div>
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
          courseList.map((item, index) => {
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
          <Num data={2000}></Num>
          <div className="center-data-text">年销售额（万元）</div>
        </div>
        <div className="center-data-item center-data-center">
          <Num data={3400}></Num>
          <div className="center-data-text">月销售额（万元）</div>
        </div>
        <div className="center-data-item">
          <Num data={650}></Num>
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
      <div className={`headers ${lineData.length > 5 ? 'headers-scr' : ''} header-right`}>
        <span>岗位名称</span>
        <span>销售额</span>
        <span>排名</span>
      </div>
      <div className="table-wrap school-scroll">
        {
          lineData.map((item, index) => {
            return <div key={index} className={`table-item ${index % 2 == 0 ? "table-stripe" : ""}`}>
              <span>{item.name}</span>
              <span>{item.people}</span>
              <span className={`${index < 3 ? 'school-coin' : ''}`}>{index + 1}</span>
            </div>
          })
        }
      </div>
      <Title className="wrap-10 text-yellow" text="线下销售额数据"></Title>
      <div className="company-wrap school-scroll school-scroll2">
        {
          top50List.map((item, index) => {
            return <div className="company-item">
              <div className={`company-name ${index <= 2 ? 'company-top' : ''}`}>
                <span className="index">
                  <span className={index <= 2 && 'top3-text'}>{index + 1}</span>
                  <span className="name">{item.name}</span>
                </span>
                <span className={`count ${index <= 2 && 'top3'}`}>{item.count}万元</span>
              </div>
              <Progress size="small" percent={item.count} showInfo={false} strokeColor={{
                '0%': index <= 2 ? '#FF6D3E35' : '#EFF4FF35',
                '100%': index <= 2 ? '#FFD03B' : '#EFF4FF'
              }} />
            </div>
          })
        }
      </div>

      <Title className="wrap-10" text="TOP10岗位"></Title>
      <div className={`headers ${jobList.length > 5 ? 'headers-scr' : ''}`}>
        <span>岗位</span>
        <span>人数</span>
        <span>排名</span>
      </div>
      <div className="table-wrap school-scroll">
        {
          top10.map((item, index) => {
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
          <div>建设银行</div>
          <div>阿里巴巴</div>
        </div>
        <div className="lines line-stripe">
          <div>腾讯</div>
          <div>华为</div>
        </div>
        <div className="lines">
          <div>国家电网</div>
          <div>农业银行</div>
        </div>
        <div className="lines line-stripe">
          <div>石油天然气集团</div>
          <div>中国石油化工集团</div>
        </div>
      </div>
    </div>
  </div>
}

export default School