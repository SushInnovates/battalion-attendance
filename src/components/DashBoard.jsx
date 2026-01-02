function Dashboard({ records }) {
  const getCompanyStats = (company) => {
    const companyRecords = records.filter(r => r.company === company);
    const total = companyRecords.length;
    const present = companyRecords.filter(r => r.status === 'present').length;
    const leave = companyRecords.filter(r => r.status === 'leave').length;
    const others = companyRecords.filter(r => r.status === 'absent' || r.status === 'duty').length;
    return { total, present, leave, others };
  };

  const alpha = getCompanyStats('Alpha');
  const bravo = getCompanyStats('Bravo');
  const charlie = getCompanyStats('Charlie');

  return (
    <div>
      <div className="battalion-card">
        <div className="battalion-header">
          <div className="battalion-name">Alpha Company</div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Total</div>
            <div className="battalion-total">{alpha.total}</div>
          </div>
        </div>
        <div className="company-stats">
          <div className="stat present">
            <div className="stat-label">Present</div>
            <div className="stat-value">{alpha.present}</div>
          </div>
          <div className="stat leave">
            <div className="stat-label">Leave</div>
            <div className="stat-value">{alpha.leave}</div>
          </div>
          <div className="stat others">
            <div className="stat-label">Others</div>
            <div className="stat-value">{alpha.others}</div>
          </div>
        </div>
      </div>

      <div className="battalion-card">
        <div className="battalion-header">
          <div className="battalion-name">Bravo Company</div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Total</div>
            <div className="battalion-total">{bravo.total}</div>
          </div>
        </div>
        <div className="company-stats">
          <div className="stat present">
            <div className="stat-label">Present</div>
            <div className="stat-value">{bravo.present}</div>
          </div>
          <div className="stat leave">
            <div className="stat-label">Leave</div>
            <div className="stat-value">{bravo.leave}</div>
          </div>
          <div className="stat others">
            <div className="stat-label">Others</div>
            <div className="stat-value">{bravo.others}</div>
          </div>
        </div>
      </div>

      <div className="battalion-card">
        <div className="battalion-header">
          <div className="battalion-name">Charlie Company</div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Total</div>
            <div className="battalion-total">{charlie.total}</div>
          </div>
        </div>
        <div className="company-stats">
          <div className="stat present">
            <div className="stat-label">Present</div>
            <div className="stat-value">{charlie.present}</div>
          </div>
          <div className="stat leave">
            <div className="stat-label">Leave</div>
            <div className="stat-value">{charlie.leave}</div>
          </div>
          <div className="stat others">
            <div className="stat-label">Others</div>
            <div className="stat-value">{charlie.others}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
