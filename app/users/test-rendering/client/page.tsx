"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

const UsersPage = async () => {
  const [users, setUsers] = useState<User[]>([]);
  const [timer, setTimer] = useState(new Date());

  useEffect(() => {
    const time = setInterval(() => {
      setTimer(new Date());
    }, 1000);

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then(setUsers);

    return () => clearInterval(time);
  }, []);

  return (
    <main>
      <h1>Users Page</h1>
      <p>{timer.toLocaleTimeString()}</p>
      <Link href="/">Go to home page</Link>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </main>
  );
};

export default UsersPage;
