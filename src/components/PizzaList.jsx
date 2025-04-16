import React, { useState, useEffect } from "react";

//import pizzaData from "../data/pizza.json";
import PizzaCard from "../components/PizzaCard";
import Search from "./Search.jsx";
import styles from './styles_modules/PizzaList.module.css';

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProductForm from "./ProductForm";


import debounce from "lodash/debounce";
import { useCallback } from "react";


const API_URL = "https://67fbd1781f8b41c81684f5de.mockapi.io/api/v1/products";

function PizzaList() {
  const [pizzas, setPizzas] = useState([]); // список всех пицц
  const [filteredPizzas, setFilteredPizzas] = useState([]); // отфильтрованные пиццы

  //добавление нового товара в список пицц
  const handleAddProduct = (newPizza) => {
    setPizzas([...pizzas, newPizza]);
    setFilteredPizzas([...pizzas, newPizza]);
  };

  //это функция для загрузки данных с API
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setPizzas(data); // сохраняем пиццы
        setFilteredPizzas(data); // устанавливаем их в фильтрованный список
        setLoading(false); // снимаем состояние загрузки
      })
      .catch((error) => {
        console.error("Ошибка загрузки:", error);
        setLoading(false);
      });
  }, []);


  /* 
  useEffect(() => {
    setPizzas(pizzaData);
    setFilteredPizzas(pizzaData);
  }, []);
*/

  //это функция для обработки поиска пицц по имени
const handleSearch = useCallback(
  debounce((query) => {
    const filtered = pizzas.filter((pizza) =>
      pizza.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPizzas(filtered);
  }, 300), // 300 мс задержка
  [pizzas]
);


return (
  <>
    <ProductForm onAdd={handleAddProduct} />
    <h2 className={styles.title}>Пиццы</h2>
    <Search onSearch={handleSearch} />
    {loading ? (
      <div className={styles.pizzaList}>
        {Array(6).fill().map((_, index) => (
          <div key={index}>
            <Skeleton height={200} />
            <Skeleton count={2} />
          </div>
        ))}
      </div>
    ) : (
      <div className={styles.pizzaList}>
        {filteredPizzas.map((pizza) => (
          <PizzaCard key={pizza.id} pizza={pizza} />
        ))}
      </div>
    )}
  </>
);
}


export default PizzaList;