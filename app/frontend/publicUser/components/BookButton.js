import { getUserFromServer } from "@/app/hooks/getUserFromServer";
import Link from "next/link";

export default async function BookButton() {
  const user = await getUserFromServer();
  console.log(user);
  

  const href = user  ?  "/frontend/admin/bookings" : "/frontend/publicUser/loginUser";
  const label = user ? "Book Venue" : "Login First";

  return (
    <Link href={href} className="bg-blue-600 text-white px-6 py-2 rounded">
      {label}
    </Link>
  );
}
