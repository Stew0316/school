import { observer } from "mobx-react";
import store from "@/store/school";

const HeadName = ({ className }) => {
  return (
    <div className={className}>
      <div className="text">{store.name}</div>
    </div>
  );
};

export default observer(HeadName);