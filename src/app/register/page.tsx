'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/context/authContext'; // импорт из контекста
import styles from './register.module.scss';

interface User {
  name: string;
  password: string;
}

export default function RegisterPage() {
  const [user, setUser] = useState<User>({ name: '', password: '' });
  const [message, setMessage] = useState<string>('');
  const router = useRouter();
  const { login } = useAuth(); // получаем функцию login из контекста

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('https://683ec24c1cd60dca33dcfbea.mockapi.io/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (!response.ok) throw new Error('Ошибка при регистрации');

      const data = await response.json();

      // Обновляем контекст с помощью login
      login(data.id);  // <-- вызываем login из контекста, чтобы обновить состояние авторизации
      router.push('/profile'); // Переход на страницу профиля
    } catch (error) {
      console.error(error);
      setMessage('Не удалось зарегистрироваться');
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2>Регистрация</h2>
      <form onSubmit={handleRegister} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Имя"
          value={user.name}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={user.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Зарегистрироваться</button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}
