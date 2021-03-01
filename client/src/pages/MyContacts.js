import React from "react";

import st from  './MyContacts.module.css'
export const MyContacts = () => {
  return (
    <ul className={st.ul}>
      <li>
        <a href="https://t.me/Chingiz_1980" target="_blank" rel="noreferrer">Написать Мне в Telegram https://t.me/Chingiz_1980</a>
      </li>
      <li>
        <a href="mailto:shigayevphone@gmail.com"> написать мне на почту</a>
      </li>
      <li>
        <a href="tel:+994503400509">+994503400509</a>
      </li>
    </ul>
  );
};
