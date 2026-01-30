import Link from "next/link";
import { sort } from "fast-sort";
import { Suspense } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  searchParams: Promise<{ sortOrder: string }>;
}

const UsersPage = async ({ searchParams }: Props) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    next: { revalidate: 5 },
  });
  const users: User[] = await res.json();
  const { sortOrder } = await searchParams;

  const sortedUsers = sort(users).asc(
    sortOrder === "email" ? (user) => user.email : (user) => user.name
  );
  return (
    <main>
      <h1>Users Page</h1>
      <Link href={"/users/new"} className="btn">
        Create new user
      </Link>
      <p>{new Date().toLocaleTimeString()}</p>
      <Link href="/">Go to home page</Link>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>
                <Link href={"/users?sortOrder=name"}>Name</Link>
              </th>
              <th>
                <Link href={"/users?sortOrder=email"}>Email</Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user) => (
              <tr key={user.id}>
                <th>{user.id}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default UsersPage;
