import useSWR from 'swr'
import axios from 'axios'
import Link from 'next/link'

const fetcher = url => axios.get(url).then(r => r.data)

export default function Doctors() {
  const { data, error } = useSWR('/api/doctors', fetcher)

  if (error) return <div className="p-6">Failed to load</div>
  if (!data) return <div className="p-6">Loading...</div>

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Doctors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map(d => (
          <div key={d._id} className="p-4 bg-white rounded shadow">
            <h3 className="text-lg font-bold">{d.doctorName}</h3>
            <p className="text-sm text-gray-600">{d.specialization}</p>
            <p className="mt-2">{d.bio}</p>
            <div className="mt-4">
              <Link href={`/doctor/${d._id}`}><a className="text-blue-600">View Profile</a></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
