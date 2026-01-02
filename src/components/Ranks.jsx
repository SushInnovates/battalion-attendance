import { useState } from 'react';

function Ranks({ records }) {
  const [selectedCompany, setSelectedCompany] = useState('Alpha');

  const getRankStats = (company) => {
    const companyRecords = records.filter(r => r.company === company);
    const rankCounts = {};
    
    companyRecords.forEach(r => {
      rankCounts[r.rank] = (rankCounts[r.rank] || 0) + 1;
    });

    return rankCounts;
  };

  const rankStats = getRankStats(selectedCompany);
  const rankIcons = {
    'Jawan': '👨‍✈️',
    'Sepoy': '🪖',
    'Naib Subedar': '⭐',
    'Subedar': '⭐⭐',
    'Officer': '🎖️'
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <div className="form-group">
          <label>Select Company</label>
          <select value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)}>
            <option value="Alpha">Alpha Company</option>
            <option value="Bravo">Bravo Company</option>
            <option value="Charlie">Charlie Company</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '12px' }}>
        {Object.entries(rankStats).map(([rank, count]) => (
          <div key={rank} style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '16px',
            textAlign: 'center',
            transition: 'all 0.3s ease'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>{rankIcons[rank] || '👤'}</div>
            <div style={{ color: 'var(--primary-gold)', fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>{rank}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{count} soldiers</div>
          </div>
        ))}
      </div>

      {Object.keys(rankStats).length === 0 && (
        <div className="empty-state">
          <p>No rank data available for {selectedCompany} Company</p>
        </div>
      )}
    </div>
  );
}

export default Ranks;
