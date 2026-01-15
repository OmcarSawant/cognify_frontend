import './MetricCard.css';

function MetricCard({ title, value, change, changeType, icon }) {
  return (
    <div className="metric-card">
      <div className="metric-header">
        <div className="metric-icon">{icon}</div>
      </div>
      <div className="metric-content">
        <div className="metric-title">{title}</div>
        <div className="metric-value">{value}</div>
        <div className={`metric-change ${changeType}`}>
          <span className="change-icon">{changeType === 'positive' ? '↑' : changeType === 'negative' ? '↓' : '~'}</span>
          {change}
        </div>
      </div>
    </div>
  );
}

export default MetricCard;
