import { useRef, useState } from "react";
import s from "./Card.module.css";
import { IoHeartSharp } from "react-icons/io5";
import file from '/public/music.m4a';
const Card = () => {
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef(null);
  const toggleCard = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; 
      }
  };

  return (
    <div>
         <audio ref={audioRef} src={file} preload="auto"></audio>
      <div
        className={`${s.card} ${isOpen ? s.open : ""}`}
        onClick={toggleCard}
      >
        <div className={s.arrows}>
          <div
            className={`${s.arrow1} ${isOpen ? s.hidden : ""}`}
          ></div>
          <div
            className={`${s.arrow2} ${isOpen ? s.hidden : ""}`}
          ></div>
        </div>
        <div className={`${s.heart} ${isOpen ? s.hidden : ""}`}>
          <IoHeartSharp fill="red" size="50px" />
        </div>
        <p className={s.press}>Press on the heart</p>
        <div className={`${s.letter} ${isOpen ? s.open : ""}`}>
          <span>Привіт! <br />Вітаю тебе з прийдешніми святами! Ось і закінчується 2024 рік. І ми провели його разом, дякую тобі за це. За цей рік багато чого сталося і хорошого і поганого, але здебільшого тільки позитивне. Я тебе дуже сильно люблю і впевнена що ми будемо ще не один рік проводити разом. Дякую за, те що зробив цей рік кращим і був зі мною у тяжкі для мене моменти, завжди підтримував. Тут невеличкий подарунок від мене. Нехай ця машинка  нагадує тобі дещо. Ps: маленька записка в коробочці. Музичка для настрою!! <br />
Люблю тебе! <br />
Хохоххохохо! <br />Веселих свят
<br />Твоя зірочка ❤️ </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
