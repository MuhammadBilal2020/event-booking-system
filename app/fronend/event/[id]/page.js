// Server Component - SSR
import SingleEvent from "@/app/components/SingleEvent";


export default async function SingleEventPage({ params }) {
  const { id } = await params;

  const res = await fetch(`http://localhost:3000/api/event/get-single-event/${id}`, {
    cache: 'no-store', // ✅ Important for SSR
  });

  if (!res.ok) {
    return <div className="p-6">Event not found</div>;
  }

  const event = await res.json();

  return (
   <>
   <h1>Event Detail</h1>
   <SingleEvent id ={id} event ={event}/>
   
   </>
  );
}
