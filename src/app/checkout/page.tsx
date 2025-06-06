"use client";

import React from "react";
import { useCartStore } from "@/store/cartStore/useCartStore";
import Image from "next/image";
import styles from "./checkout.module.scss";

const handleCheckout = () => {
  alert("Заказ оформлен! Спасибо!");
};

const CheckoutPage = () => {
  const { cart } = useCartStore();
  return (
    <div className={styles.checkout}>
      <h1 className={styles.title}>Оформление заказа</h1>

      <div className={styles.container}>
        <div className={styles.left}>
          <section className={styles.section}>
            <h2>1. Корзина</h2>
            {cart.length === 0 ? (
  <p>Корзина пуста.</p>
) : (
  <ul>
    {cart.map((pizza) => (
      <li key={`${pizza.id}-${pizza.size}-${pizza.dough}-${pizza.toppings.join(",")}`} className={styles.pizzaItem}>
        <div className={styles.pizzaInfo}>
          <Image src={pizza.image} width={50} height={50} alt={pizza.name} />
          <div>
            <p>{pizza.name}</p>
            <p>{pizza.size}, {pizza.dough}</p>
            {pizza.toppings.length > 0 && <p>+ {pizza.toppings.join(", ")}</p>}
          </div>
        </div>
        <p>{pizza.quantity} x {pizza.totalPrice}C</p>
      </li>
    ))}
  </ul>
)}

          </section>

          <section className={styles.section}>
            <h2>2. Персональная информация</h2>
            <div className={styles.form}>
              <input type="text" placeholder="Имя" />
              <input type="text" placeholder="Фамилия" />
              <input type="email" placeholder="E-mail" />
              <input type="tel" placeholder="+996 (700) 000-000" />
            </div>
          </section>

          <section className={styles.section}>
            <h2>3. Адрес доставки</h2>
            <div className={styles.form}>
              <input type="text" placeholder="Введите адрес" />
            </div>
          </section>
        </div>

        <div className={styles.right}>
          <div className={styles.summary}>
            <h3>Итого: 2365 C</h3>
            <p>Стоимость товаров: 2005 C</p>
            <p>Налог: 240 C</p>
            <p>Доставка: 120 C</p>
            <button className={styles.button} onClick={handleCheckout}>
              Перейти к оплате
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
