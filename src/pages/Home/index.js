// import arr from "./fetchAPI";
import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import SpecialPost from "./components/SpecialPost";
import AutoSlide from "./components/AutoSlide";
import SpecialEvent from "./components/SpecialEvent";
// import ImageRender from "./components/ImageRender";


function Home() {

  const cx = classNames.bind(styles);

  return (
    <div>
      <div className={cx("wrapper")}>
        <AutoSlide></AutoSlide>
        <SpecialPost></SpecialPost>
        <SpecialEvent></SpecialEvent>
      </div>
    </div>
  );
}

export default Home;
