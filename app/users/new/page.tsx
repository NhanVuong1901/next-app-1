"use client";

import { useRouter } from "next/navigation";

const NewPage = () => {
  const router = useRouter();
  return (
    <div>
      <button className="btn btn-dash" onClick={() => router.push("/users")}>
        Created Successfully
      </button>
    </div>
  );
};

export default NewPage;
