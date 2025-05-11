import { observer } from "mobx-react";
import store from "@/store/school";

const HeadName = ({ className }) => {
  return (
    <div className={className}>
      <marquee
        direction="up"
      >
        <div className="text">{store.name}</div>
      </marquee>
    </div>
  );
};

export default observer(HeadName);