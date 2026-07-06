import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { authState } from '../state/authAtom';
import api from '../api/axios';

function Dashboard() {
  const auth = useRecoilValue(authState);
  const [applications, setApplications] = useState([]);
  const [form, setForm] = useState({ company: '', role: '', status: 'applied', notes: '' });
  const [editingId, setEditingId] = useState(null);

  const authHeader = { headers: { Authorization: `Bearer ${auth.token}` } };

  const fetchApplications = async () => {
    const res = await api.get('/applications', authHeader);
    setApplications(res.data);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.put(`/applications/${editingId}`, form, authHeader);
      setEditingId(null);
    } else {
      await api.post('/applications', form, authHeader);
    }
    setForm({ company: '', role: '', status: 'applied', notes: '' });
    fetchApplications();
  };

  const handleDelete = async (id) => {
    await api.delete(`/applications/${id}`, authHeader);
    fetchApplications();
  };

  const handleEditClick = (app) => {
    setForm({ company: app.company, role: app.role, status: app.status, notes: app.notes || '' });
    setEditingId(app._id);
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <form onSubmit={handleCreate}>
        <input name="company" placeholder="Company" value={form.company} onChange={handleChange} />
        <input name="role" placeholder="Role" value={form.role} onChange={handleChange} />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
        <input name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} />
        <button type="submit">{editingId ? 'Update' : 'Add'} Application</button>
      </form>

      <ul>
        {applications.map((app) => (
          <li key={app._id}>
            {app.company} — {app.role} — {app.status}
            <button onClick={() => handleEditClick(app)}>Edit</button>
            <button onClick={() => handleDelete(app._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;