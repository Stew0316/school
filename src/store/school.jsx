import { makeAutoObservable } from 'mobx'

class Store {
  constructor() {
    makeAutoObservable(this);
  }
  name = "京东校园云全国大数据中台"
  selectArea = -1
  selectAreaName = ''
  updateName(name) {
    this.name = name;
  }
  updateSelectArea(id) {
    this.selectArea = id;
  }
  updateSelectAreaName(name) {
    this.selectAreaName = name;
  }
}
// 注意：每一个 store 只能初始化一次，所以导出的应该不是 Store 这个类，而是 Store 这个实例，所以需要 new 实例化一下
export default new Store()