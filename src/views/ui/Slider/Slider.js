import { useContext, useState } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsChevronRight } from "react-icons/bs";
import { BsChevronLeft } from "react-icons/bs";
import { GoQuote } from "react-icons/go";
import "./Slider.css";
import "react-horizontal-scrolling-menu/dist/styles.css";
import { Col, Row } from "reactstrap";
import visit from "../../../assets/dashboard/visit.png";
import revenue from "../../../assets/dashboard/revenue.png";
import sold from "../../../assets/dashboard/sold.png";
import customers from "../../../assets/dashboard/ancestors.png";
import TopCards from "../../../components/dashboard/TopCards";
import dataTransactions from "../../../assets/dashboard/money-transfer.png";
import WithdrawCards from "../../../components/dashboard/WithdrawCards";

const myArray = [
  {
    title: "",
    subtitle: "",
    value: "",
    icon: "",
    wallet: true,
  },
];

const Slider = ({ array }) => {
  const [selected, setSelected] = useState([]);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(500);
  const [ease, setEase] = useState("noEasing");
  const [rateCards, setRateCards] = useState(["", "", ""]);

  const getItems = () =>
    array.map((data, ind) => ({
      data: data,
      id: `element-${ind}`,
    }));

  const [items, setItems] = useState(getItems);

  const easingFunctions = {
    noEasing: undefined,
    linear: (t) => t,
    easeInQuad: (t) => t * t,
    easeOutQuad: (t) => t * (2 - t),
    easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
    easeInCubic: (t) => t * t * t,
    easeOutCubic: (t) => --t * t * t + 1,
    easeInOutCubic: (t) =>
      t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    easeInQuart: (t) => t * t * t * t,
    easeOutQuart: (t) => 1 - --t * t * t * t,
    easeInOutQuart: (t) =>
      t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
    easeInQuint: (t) => t * t * t * t * t,
    easeOutQuint: (t) => 1 + --t * t * t * t * t,
    easeInOutQuint: (t) =>
      t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
  };

  const isItemSelected = (id) => !!selected.find((el) => el === id);

  const handleClick =
    (id) =>
    ({ getItemById, scrollToItem }) => {
      const itemSelected = isItemSelected(id);

      setSelected((currentSelected) =>
        itemSelected
          ? currentSelected.filter((el) => el !== id)
          : currentSelected.concat(id)
      );
    };

  return (
    <ScrollMenu
      transitionDuration={duration}
      transitionEase={easingFunctions[ease]}
      // LeftArrow={LeftArrow}
      // RightArrow={RightArrow}
    >
      {getItems().map(({ id, data }) => (
        <Card
          itemId={id}
          title={id}
          key={id}
          data={data}
          onClick={handleClick(id)}
          selected={isItemSelected(id)}
        />
      ))}
    </ScrollMenu>
  );
};

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

  return (
    <Arrow disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
      <BsChevronLeft className="rate__slider__arrow__left" />
    </Arrow>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);

  return (
    <Arrow disabled={isLastItemVisible} onClick={() => scrollNext()}>
      <BsChevronRight className="rate__slider__arrow__right" />
    </Arrow>
  );
}

function Card({ onClick, selected, title, itemId, data }) {
  const visibility = useContext(VisibilityContext);

  return (
    <div
      className="rate__tes__cardmm"
      onClick={() => onClick(visibility)}
      tabIndex={0}
    >
      {/* <Row
      // className={
      //   !!visibility.isItemVisible(itemId)
      //     ? "rate__tes__card__content"
      //     : "rate__tes__card__content__nv"
      // }
      > */}
      {/* <ul>
          <img src={data.rate.img} alt="" />
        </ul>
        <a href={data.rate.img} download>
          <button>Download Rate</button>
        </a> */}
      {data.wallet ? (
        <WithdrawCards
          bg="bg-light-warning text-warning"
          title={data.title}
          subtitle={data.subtitle}
          earning={data.value}
          icon={data.icon}
        />
      ) : (
        <TopCards
          bg="bg-light-warning text-warning"
          title={data.title}
          subtitle={data.subtitle}
          earning={data.value}
          icon={data.icon}
        />
      )}
    </div>
  );
}

function Arrow({ disabled, onClick, children }) {
  const classNames = ["arrow", disabled && "arrow--disabled"]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classNames} onClick={onClick}>
      {children}
    </div>
  );
}

export default Slider;
