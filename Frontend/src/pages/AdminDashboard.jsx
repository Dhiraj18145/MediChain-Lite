import StatCard from "../components/StatCard";

const AdminDashboard = () => {
  return (
    <div className="page">
      <h2>Admin Dashboard</h2>
      <div className="dashboard-grid">
        <StatCard title="Total Users" value="Manage" />
        <StatCard title="Medicine Stock" value="Track" />
        <StatCard title="Appointments" value="Monitor" />
        <StatCard title="Records" value="Review" />
      </div>
      <p>Admin can manage users, medicines, records, and appointments from here.</p>
    </div>
  );
};

export default AdminDashboard;