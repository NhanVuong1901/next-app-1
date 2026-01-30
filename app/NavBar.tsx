import Link from "next/link";

const NavBar = () => {
  return (
    <div className="bg-gray-200 flex p-5">
      <Link className="mr-5" href={"/"}>
        Home
      </Link>
      <Link href={"/users"}>Users</Link>
    </div>
  );
};

export default NavBar;
