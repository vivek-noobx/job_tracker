import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { authState } from '../state/authAtom';
import api from '../api/axios';

function Dashboard() {
  const auth = useRecoilValue(authState);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const res = await api.get('/applications', {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setApplications(res.data);
    };
    fetchApplications();
  }, [auth.token]);

  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        {applications.map((app) => (
          <li key={app._id}>{app.company} — {app.role} — {app.status}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;