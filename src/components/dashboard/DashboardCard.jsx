const DashboardCard = ({ title, value, color, onClick, active }) => (
  <div
    className={`dashboard-card${active ? ' dashboard-card--active' : ''}`}
    style={{ borderTop: `4px solid ${color || '#6c63ff'}`, cursor: onClick ? 'pointer' : 'default' }}
    onClick={onClick}
  >
    <h3>{title}</h3>
    <p className="card-value">{value}</p>
    {onClick && <p className="card-hint">click to {active ? 'hide' : 'view'}</p>}
  </div>
);

export default DashboardCard;
