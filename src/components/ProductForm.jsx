import React, { useState } from "react";

function ProductForm({ onAdd }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !imageUrl) {
      setError("Пожалуйста, заполните все поля.");
      return;
    }

    const newProduct = {
      name,
      price: Number(price),
      image: imageUrl,
    };

    try {
      const res = await fetch("https://67fbd1781f8b41c81684f5de.mockapi.io/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();
      onAdd(data); // передаём новый товар в родительский компонент
      setName("");
      setPrice("");
      setImageUrl("");
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

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Добавить</button>
    </form>
  );
}

export default ProductForm;
