import AddEventForm from "./components/AddEventForm";

async function getEvents() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/event/get-events`, {
    cache: "no-store", // SSR
  });

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  return res.json();
}


export default async function Home() {
  const products = await getEvents();
  // console.log(products);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const res = await fetch('/api/event/get-events');
  //     const data = await res.json();
  //     console.log(data);
      
  //     // setUsers(data);
  //   };
  //   fetchUsers();
  // }, []);
  

  return (
   
    <>
    <div className="flex justify-between">
     
<div className="w-full">
  <AddEventForm products = {products} />
</div>
    </div>
    </>
  );
}




