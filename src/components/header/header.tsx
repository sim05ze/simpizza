"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { PizzaService } from "@/services/pizzaService";
import styles from "./styles.module.scss";
import MainIcon from "./svg/icon_pizza.svg";
import SearchVector from "./svg/search_vector.svg";
import SignInIcon from "./svg/sign_in_icon.svg";
import ShoppingCartIcon from "./svg/shopping_cart.svg";
import { IPizza } from "@/store/pizza.interface";
import Link from "next/link";
import Cart from "../cart/Cart";
import CloseBtn from "./svg/close_vector.svg";

const Header: React.FC = () => {
  const [pizzas, setPizzas] = useState<IPizza[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredPizzas, setFilteredPizzas] = useState<IPizza[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await PizzaService.fetchPizzas();
        setPizzas(response);
      } catch (error) {
        console.error("Ошибка загрузки пицц:", error);
      }
    };

    fetchPizzas();
  }, []);

  useEffect(() => {
    setFilteredPizzas(
      pizzas.filter((pizza) =>
        pizza.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, pizzas]);

  const closeCart = () => setIsCartOpen(false);

  return (
    <>
      {(searchTerm || isCartOpen) && (
        <div className={styles.overlay} onClick={closeCart}></div>
      )}

      <header
        className={`${styles.header} ${isCartOpen ? styles.disabled : ""}`}
      >
        <div className={styles.headerWrapper}>
          <Link href={"/"}>
            <div className={styles.iconContainer}>
              <Image
                className={styles.icon}
                src={MainIcon}
                alt="Главная иконка"
              />
              <div>
                <h1 className={styles.iconText1}>SIMPIZZA</h1>
                <h2 className={styles.iconText2}>вкусней уже некуда</h2>
              </div>
            </div>
          </Link>

          <div
            className={`${styles.search} ${
              isCartOpen && !searchTerm ? styles.searchDimmed : ""
            }`}
          >
            <Image
              className={styles.searchVector}
              src={SearchVector}
              alt="Иконка поиска"
            />
            <input
              placeholder="Поиск пиццы..."
              className={styles.input}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={isCartOpen}
            />
            {searchTerm && (
              <div className={styles.searchResults}>
                {filteredPizzas.map((pizza) => (
                  <Link
                    href={`/pizza/${pizza.id}`}
                    key={pizza.id}
                    onClick={() => setSearchTerm("")} 
                  >
                    <div className={styles.resultItem}>
                      <div>
                        <Image
                          src={pizza.image}
                          alt={pizza.name}
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className={styles.pizzaText}>
                        <span>{pizza.name}</span>
                        <span className={styles.pizzaprice}>
                          {pizza.price}₽
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className={styles.buttons}>
            <Link href={"/register"}>
            <button className={styles.signInButton} disabled={isCartOpen}>
              <Image src={SignInIcon} alt="Иконка входа" />
              <h3 className={styles.signInText}>Войти</h3>
            </button>
            </Link>
            
            <button
              className={styles.cartButton}
              onClick={() => setIsCartOpen(true)}
            >
              <Image src={ShoppingCartIcon} alt="Иконка корзины" />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`${styles.cartModal} ${isCartOpen ? styles.cartOpen : ""}`}
      >
        <button className={styles.closeButton} onClick={closeCart}>
          <Image src={CloseBtn} alt="Закрыть" />
        </button>
        <Cart />
      </div>
    </>
  );
};

export default Header;
