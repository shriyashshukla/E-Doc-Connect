import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function DoctorProfile() {
  const router = useRouter();
  const { id } = router.query;
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    if (!id) return;
    axios.get(`/api/doctors/${id}`).then(r => setDoc(r.data)).catch(() => {});
  }, [id])

  if (!doc) return <div className="p-6">Loading...</div>

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold">{doc.doctorName}</h2>
      <p className="text-gray-600">{doc.specialization}</p>
      <p className="mt-4">{doc.bio}</p>

      <section className="mt-6 bg-white p-4 rounded shadow">
        <h3 className="font-semibold">Book Appointment</h3>
        <form onSubmit={async e => {
          e.preventDefault();
          const form = new FormData(e.target);
          const payload = {
            patient: 'mock-user-id',
            doctor: id,
            appointmentDate: form.get('date'),
            appointmentTime: form.get('time'),
            notes: form.get('notes')
          };
          await axios.post('/api/appointments', payload);
          alert('Appointment requested');
        }}>
          <div className="mt-2">
            <input name="date" type="date" required className="border p-2 rounded w-full" />
          </div>
          <div className="mt-2">
            <input name="time" type="time" required className="border p-2 rounded w-full" />
          </div>
          <div className="mt-2">
            <textarea name="notes" className="border p-2 rounded w-full" placeholder="Notes"></textarea>
          </div>
          <div className="mt-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded">Request</button>
          </div>
        </form>
      </section>
    </div>
  )
}
