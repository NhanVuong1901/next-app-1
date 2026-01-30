import Link from "next/link";

interface User {
  id: number;
  name: string;
}

const UsersPage = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    next: { revalidate: 5 },
  });
  const users: User[] = await res.json();
  return (
    <main>
      <h1>UsersPage</h1>
      <div>{new Date().toLocaleTimeString()}</div>
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
