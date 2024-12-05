import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { Link } from "react-router-dom";
import choices from "./Choices";

const cx = classNames.bind(styles);


function Sidebar() {
  return (
    <div className={cx("wrapper")}>
      {choices.map((choice, key) => {
        return (
          <Link to={choice.path} className={cx("choice")} key={choice.key}>
            <i className={choice.icon}></i>
            <p>{choice.title}</p>
          </Link>
        );
      })}
    </div>
  );
}

export default Sidebar;
