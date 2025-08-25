import { getUserFromServer } from "@/app/hooks/getUserFromServer";
import Link from "next/link";

export default async function BookButton({ venue }) {
  const user = await getUserFromServer();
  // console.log(user);


  const href = user ? `/frontend/publicUser/booking/bookingform/${venue._id}` : "/frontend/publicUser/loginUser";
  const label = user ? "Book Venue" : "Login First";

  return (
    <Link href={href} className="w-[8rem] px-3 bg-black text-white py-2 rounded-md font-semibold 
             border-b-[1px] border-transparent 
             hover:bg-white hover:text-black hover:border-black 
             transition duration-200">
      {label}
    </Link>
  );
}
