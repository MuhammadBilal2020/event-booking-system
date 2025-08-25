// // context/UserContext.js
// "use client";
// import { createContext, useContext, useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// const UserContext = createContext();

// export function UserProvider({ children }) {
//   const router = useRouter();
//   const [user, setUser] = useState(undefined); // undefined = loading

//   useEffect(() => {
//     async function fetchUser() {
//       try {
//         const res = await fetch("/api/user/auth/me");
//         if (!res.ok) throw new Error("Not authenticated");

//         const data = await res.json();
//         setUser(data.user || null); // null = no user
//       } catch {
//         setUser(null);
//       }
//     }
//     fetchUser();
//   }, []);


//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// }

// export function useUser() {
//   return useContext(UserContext);
// }
