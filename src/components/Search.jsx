import React from "react";

import debounce from "lodash/debounce";
import styles from "./styles_modules/Search.module.css";

function Search({ onSearch }) {
  // Делаем debounce для обработки ввода.
  const debouncedSearch = debounce((event) => {
    onSearch(event.target.value); // передаем введённый текст в родительский компонент
  }, 300); // задержка 300 мс

  const handleSearchChange = (event) => {
    debouncedSearch(event); // вызываем дебаунс-обработчик
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Поиск пиццы..."
        onChange={handleSearchChange}
        className={styles.searchInput}
      />
    </div>
  );
}

export default Search;
