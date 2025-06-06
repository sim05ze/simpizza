"use client";

import styles from "./profile.module.scss";

const mockOrders = [
  {
    id: 15,
    date: "16 февраля 2024, 20:31",
    status: "Оплачено",
    items: [
      { name: "Чизбургер-пицца", quantity: 2, price: 965 },
      { name: "Диабло", quantity: 1, price: 1280 },
    ],
    total: 2245,
  },
];

export default function ProfilePage() {
  return (
    <div className={styles.profileContainer}>
      <h1>Мои заказы</h1>
      {mockOrders.map((order) => (
        <div key={order.id} className={styles.orderCard}>
          <div className={styles.orderHeader}>
            <span>Заказ #{order.id}</span>
            <span>{order.date}</span>
            <span className={styles.statusPaid}>{order.status}</span>
          </div>
          <div className={styles.itemsList}>
            {order.items.map((item, idx) => (
              <div key={idx} className={styles.item}>
                <span>{item.name}</span>
                <span>{item.price}С × {item.quantity}</span>
              </div>
            ))}
          </div>
          <div className={styles.total}>Итого: {order.total}С</div>
        </div>
      ))}
    </div>
  );
}
