import React, { useState } from "react";

import axios from "axios";

// Компонент формы для добавления нового товара
function ProductForm({ onAdd }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Сырная");
  const [size, setSize] = useState("30");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !imageUrl || !description || !size || !category) {
      setError("Пожалуйста, заполните все поля.");
      return;
    }

    const newProduct = {
      name,
      price: Number(price),
      image: imageUrl,
      description,
      category,
      sizes: [Number(size)],
    };

    try {
      const res = await axios.post("https://67fbd1781f8b41c81684f5de.mockapi.io/products", newProduct);
      onAdd(res.data);
      // Очистка полей
      setName("");
      setPrice("");
      setImageUrl("");
      setDescription("");
      setCategory("Сырная");
      setSize("30");
      setError("");
    } catch (err) {
      setError("Ошибка при добавлении товара.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Добавить товар</h3>

      <input
        type="text"
        placeholder="Название"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /><br />

      <input
        type="text"
        placeholder="Цена"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      /><br />

      <input
        type="text"
        placeholder="Ссылка на изображение"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      /><br />

      <textarea
        placeholder="Описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      /><br />

       <label>Категория: </label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Сырная">Сырная</option>
        <option value="Мясная">Мясная</option>
        <option value="Вегетарианская">Вегетарианская</option>
      </select><br /><br />

      <label>Размер:</label>
      <select value={size} onChange={(e) => setSize(e.target.value)}>
        <option value="30">30 см</option>
        <option value="40">40 см</option>
        <option value="50">50 см</option>
      </select><br /><br />
  

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Добавить</button>
    </form>
  );
}

export default ProductForm;
