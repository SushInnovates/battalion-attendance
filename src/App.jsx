import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [records, setRecords] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [ranks, setRanks] = useState([]);
  const [newCompany, setNewCompany] = useState('');
  const [newRank, setNewRank] = useState('');

const [formData, setFormData] = useState({
  company: '',
  regNo: '',
  soldierId: '',
  rank: '',
  status: 'present',
  leaveFrom: '',
  leaveUpto: '',
  remarks: ''
});



  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [filters, setFilters] = useState({ company: '', date: '', searchRegNo: '' });
  const [selectedCompany, setSelectedCompany] = useState('Alpha');
  const [showManagement, setShowManagement] = useState(false);

  // Load data on mount
  useEffect(() => {
    try {
      const savedRecords = localStorage.getItem('armyAttendance');
      const savedCompanies = localStorage.getItem('companies');
      const savedRanks = localStorage.getItem('ranks');
      
      if (savedRecords) {
        setRecords(JSON.parse(savedRecords));
      }
      
      if (savedCompanies) {
        setCompanies(JSON.parse(savedCompanies));
      } else {
        setCompanies(['Alpha', 'Bravo', 'Charlie']);
      }
      
      if (savedRanks) {
        setRanks(JSON.parse(savedRanks));
      } else {
        setRanks(['DG', 'ADG', 'IG', 'CO', '2IC', 'DC', 'AC', 'INSPECTOR', 'SI', 'ASI', 'HC', 'SR CONST.', 'CONSTABLE', 'TREADSMAN']);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setCompanies(['Alpha', 'Bravo', 'Charlie']);
      setRanks(['DG', 'ADG', 'IG', 'CO', '2IC', 'DC', 'AC', 'INSPECTOR', 'SI', 'ASI', 'HC', 'SR CONST.', 'CONSTABLE', 'TREADSMAN']);
    }
  }, []);

  // Save records
  useEffect(() => {
    if (records.length >= 0) {
      localStorage.setItem('armyAttendance', JSON.stringify(records));
    }
  }, [records]);

  // Save companies
  useEffect(() => {
    if (companies.length > 0) {
      localStorage.setItem('companies', JSON.stringify(companies));
    }
  }, [companies]);

  // Save ranks
  useEffect(() => {
    if (ranks.length > 0) {
      localStorage.setItem('ranks', JSON.stringify(ranks));
    }
  }, [ranks]);

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  const addCompany = () => {
    if (!newCompany.trim()) {
      showAlert('⚠️ Please enter company name', 'error');
      return;
    }
    if (companies.includes(newCompany.trim())) {
      showAlert('⚠️ Company already exists', 'error');
      return;
    }
    setCompanies([...companies, newCompany.trim()]);
    setNewCompany('');
    showAlert(`✅ ${newCompany} Company added!`, 'success');
  };

  const deleteCompany = (company) => {
    if (companies.length <= 1) {
      showAlert('⚠️ Must have at least one company', 'error');
      return;
    }
    if (window.confirm(`Delete ${company} Company?`)) {
      setCompanies(companies.filter(c => c !== company));
      showAlert(`✅ ${company} Company deleted`, 'success');
    }
  };

  const addRank = () => {
    if (!newRank.trim()) {
      showAlert('⚠️ Please enter rank name', 'error');
      return;
    }
    if (ranks.includes(newRank.trim())) {
      showAlert('⚠️ Rank already exists', 'error');
      return;
    }
    setRanks([...ranks, newRank.trim()]);
    setNewRank('');
    showAlert(`✅ ${newRank} Rank added!`, 'success');
  };

  const deleteRank = (rank) => {
    if (ranks.length <= 1) {
      showAlert('⚠️ Must have at least one rank', 'error');
      return;
    }
    if (window.confirm(`Delete ${rank} Rank?`)) {
      setRanks(ranks.filter(r => r !== rank));
      showAlert(`✅ ${rank} Rank deleted`, 'success');
    }
  };

  const addRecord = (e) => {
    e.preventDefault();
    if (!formData.company || !formData.regNo || !formData.soldierId || !formData.rank) {
      showAlert('⚠️ Please fill all required fields', 'error');
      return;
    }
  
    const record = {
  ...formData,
  id: Date.now(),
  date: new Date().toLocaleDateString('en-IN'),
  time: new Date().toLocaleTimeString('en-IN')
};



    setRecords([...records, record]);
    showAlert(`✅ Attendance marked for ${formData.soldierId} (${formData.regNo})!`, 'success');
 
 setFormData({
  company: '',
  regNo: '',
  soldierId: '',
  rank: '',
  status: 'present',
  leaveFrom: '',
  leaveUpto: '',
  remarks: ''
});



  };

  const deleteRecord = (id) => {
    if (window.confirm('Delete this attendance record?')) {
      setRecords(records.filter(r => r.id !== id));
      showAlert('✅ Record deleted', 'success');
    }
  };

  const getCompanyStats = (company) => {
    const companyRecords = records.filter(r => r.company === company);
    return {
      total: companyRecords.length,
      present: companyRecords.filter(r => r.status === 'present').length,
      leave: companyRecords.filter(r => r.status === 'leave').length,
      others: companyRecords.filter(r => r.status === 'absent' || r.status === 'duty').length
    };
  };

  const getRankStats = (company) => {
    const companyRecords = records.filter(r => r.company === company);
    const rankCounts = {};
    companyRecords.forEach(r => {
      rankCounts[r.rank] = (rankCounts[r.rank] || 0) + 1;
    });
    return rankCounts;
  };

  const exportToCSV = () => {
    if (records.length === 0) {
      showAlert('⚠️ No records to export', 'error');
      return;
    }

    let csv = 'Company,Regiment No,Soldier Name,Rank,Status,Leave From,Leave Upto,Remarks,Date\n';


    records.forEach(record => {
  csv += `"${record.company}","${record.regNo}","${record.soldierId}","${record.rank}","${record.status}","${record.leaveFrom || '-'}","${record.leaveUpto || '-'}","${record.remarks || '-'}","${record.date}"\n`;

    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Battalion_Attendance_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    showAlert('✅ CSV exported successfully!', 'success');
  };

  const filteredRecords = records.filter(r => {
    const matchCompany = !filters.company || r.company === filters.company;
    const matchDate = !filters.date || r.date === new Date(filters.date).toLocaleDateString('en-IN');
    const matchRegNo = !filters.searchRegNo || 
      (r.regNo && r.regNo.toString().toLowerCase().includes(filters.searchRegNo.toLowerCase())) ||
      (r.soldierId && r.soldierId.toLowerCase().includes(filters.searchRegNo.toLowerCase()));
    return matchCompany && matchDate && matchRegNo;
  });

  const rankIcons = {
    'DG': '⭐⭐⭐',
    'ADG': '⭐⭐',
    'IG': '⭐',
    'CO': '🎖️',
    '2IC': '🎖️',
    'DC': '👨‍✈️',
    'AC': '👨‍✈️',
    'INSPECTOR': '👮',
    'SI': '👮‍♂️',
    'ASI': '🪖',
    'HC': '🪖',
    'SR CONST.': '👨‍✈️',
    'CONSTABLE': '👨‍✈️',
    'TRADESMAN': '🔧'
  };

  return (
    <div className="container">
      <header>
        <h1>🎖️ BATTALION 161</h1>
        <p>Military Attendance Management System</p>
      </header>

      <div className="content">
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
              <h2 style={{ color: 'var(--primary-gold)', fontSize: '24px', margin: 0 }}>Company Overview</h2>
              <button 
                className="btn btn-primary" 
                onClick={() => setShowManagement(!showManagement)}
                style={{ width: 'auto', padding: '10px 20px', fontSize: '13px', marginBottom: 0 }}
              >
                {showManagement ? '📊 View Dashboard' : '⚙️ Manage Companies & Ranks'}
              </button>
            </div>

            {showManagement ? (
              <div className="form-container">
                {alert.show && <div className={`alert ${alert.type}`}>{alert.message}</div>}
                
                <h3 style={{ color: 'var(--primary-gold)', marginBottom: '20px', fontSize: '20px' }}>Manage Companies</h3>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                  <input 
                    type="text"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    placeholder="Enter new company name"
                    style={{ flex: 1 }}
                    onKeyPress={(e) => e.key === 'Enter' && addCompany()}
                  />
                  <button onClick={addCompany} className="btn btn-primary" style={{ width: 'auto', padding: '12px 24px', marginBottom: 0 }}>
                    ➕ Add
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px', marginBottom: '40px' }}>
                  {companies.map(company => (
                    <div key={company} style={{ 
                      background: 'var(--dark-bg)', 
                      padding: '15px', 
                      borderRadius: '8px', 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      border: '1px solid var(--border-color)'
                    }}>
                      <span style={{ color: 'var(--primary-gold)', fontWeight: 600 }}>{company} Company</span>
                      <button 
                        onClick={() => deleteCompany(company)}
                        style={{
                          background: 'var(--accent-red)',
                          color: 'white',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: 600
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>

                <h3 style={{ color: 'var(--primary-gold)', marginBottom: '20px', fontSize: '20px' }}>Manage Ranks</h3>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                  <input 
                    type="text"
                    value={newRank}
                    onChange={(e) => setNewRank(e.target.value)}
                    placeholder="Enter new rank name"
                    style={{ flex: 1 }}
                    onKeyPress={(e) => e.key === 'Enter' && addRank()}
                  />
                  <button onClick={addRank} className="btn btn-primary" style={{ width: 'auto', padding: '12px 24px', marginBottom: 0 }}>
                    ➕ Add
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                  {ranks.map(rank => (
                    <div key={rank} style={{ 
                      background: 'var(--dark-bg)', 
                      padding: '15px', 
                      borderRadius: '8px', 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      border: '1px solid var(--border-color)'
                    }}>
                      <span style={{ color: 'var(--primary-gold)', fontWeight: 600 }}>{rank}</span>
                      <button 
                        onClick={() => deleteRank(rank)}
                        style={{
                          background: 'var(--accent-red)',
                          color: 'white',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: 600
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="dashboard-grid">
                {companies.map(company => {
                  const stats = getCompanyStats(company);
                  return (
                    <div key={company} className="battalion-card">
                      <div className="battalion-header">
                        <div className="battalion-name">{company} Company</div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>Total</div>
                          <div className="battalion-total">{stats.total}</div>
                        </div>
                      </div>
                      <div className="company-stats">
                        <div className="stat present">
                          <div className="stat-label">Present</div>
                          <div className="stat-value">{stats.present}</div>
                        </div>
                        <div className="stat leave">
                          <div className="stat-label">Leave</div>
                          <div className="stat-value">{stats.leave}</div>
                        </div>
                        <div className="stat others">
                          <div className="stat-label">Others</div>
                          <div className="stat-value">{stats.others}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Attendance Tab */}
        {activeTab === 'attendance' && (
          <div className="form-container">
            {alert.show && <div className={`alert ${alert.type}`}>{alert.message}</div>}

            <div style={{ background: 'var(--dark-bg)', borderLeft: '4px solid var(--primary-gold)', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
              <div style={{ color: 'var(--primary-gold)', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>TODAY'S DATE</div>
              <div style={{ color: 'var(--text-light)', fontSize: '14px' }}>
                {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>

            <form onSubmit={addRecord}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Company *</label>
                  <select value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })}>
                    <option value="">Select Company</option>
                    {companies.map(c => <option key={c} value={c}>{c} Company</option>)}
                  </select>
                </div>

                <div className="form-group">
                  <label>Regiment Number *</label>
                  <input 
                    type="text" 
                    value={formData.regNo}
                    onChange={(e) => setFormData({ ...formData, regNo: e.target.value })}
                    placeholder="e.g. 221545"
                  />
                </div>

                <div className="form-group">
                  <label>Soldier Name *</label>
                  <input 
                    type="text" 
                    value={formData.soldierId}
                    onChange={(e) => setFormData({ ...formData, soldierId: e.target.value })}
                    placeholder="Enter soldier name"
                  />
                </div>

                <div className="form-group">
                  <label>Rank *</label>
                  <select value={formData.rank} onChange={(e) => setFormData({ ...formData, rank: e.target.value })}>
                    <option value="">Select Rank</option>
                    {ranks.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>

           <div className="form-group">
  <label>Leave From</label>
  <input 
    type="date" 
    value={formData.leaveFrom}
    onChange={(e) => setFormData({ ...formData, leaveFrom: e.target.value })}
    placeholder="Start date"
  />
</div>

<div className="form-group">
  <label>Leave Upto</label>
  <input 
    type="date" 
    value={formData.leaveUpto}
    onChange={(e) => setFormData({ ...formData, leaveUpto: e.target.value })}
    min={formData.leaveFrom}
    placeholder="End date"
  />
</div>



                <div className="form-group">
                  <label>Check-Out Time</label>
                  <input 
                    type="time" 
                    value={formData.checkOutTime}
                    onChange={(e) => setFormData({ ...formData, checkOutTime: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Remarks/Reason</label>
                <textarea 
                  value={formData.remarks}
                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                  placeholder="Enter leave reason or remarks" 
                  rows="3"
                />
              </div>

              <button type="submit" className="btn btn-primary">✓ Mark Attendance</button>
            </form>
          </div>
        )}

        {/* Register Tab */}
        {activeTab === 'register' && (
          <div>
            <div className="form-container" style={{ marginBottom: '20px' }}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Search by Regiment No</label>
                  <input 
                    type="text" 
                    value={filters.searchRegNo} 
                    onChange={(e) => setFilters({ ...filters, searchRegNo: e.target.value })}
                    placeholder="Type regiment number or name..."
                  />
                </div>

                <div className="form-group">
                  <label>Filter by Company</label>
                  <select value={filters.company} onChange={(e) => setFilters({ ...filters, company: e.target.value })}>
                    <option value="">All Companies</option>
                    {companies.map(c => <option key={c} value={c}>{c} Company</option>)}
                  </select>
                </div>

                <div className="form-group">
                  <label>Filter by Date</label>
                  <input type="date" value={filters.date} onChange={(e) => setFilters({ ...filters, date: e.target.value })} />
                </div>
              </div>

              <button className="btn btn-primary" onClick={exportToCSV}>📥 Export to CSV</button>
            </div>

            {filteredRecords.length === 0 ? (
              <div className="empty-state">
                <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}>📭</div>
                <p>No attendance records found</p>
              </div>
            ) : (
              <div className="table-wrapper">
                <table>
                 <thead>
  <tr>
    <th>SI</th>
    <th>Regiment No</th>
    <th>Name</th>
    <th>Rank</th>
    <th>Company</th>
    <th>Status</th>
    <th>Leave From</th>
    <th>Leave Upto</th>
    <th>Date</th>
    <th>Action</th>
  </tr>
</thead>

                  <tbody>
  {filteredRecords.map((record, index) => (
    <tr key={record.id}>
      <td>{index + 1}</td>
      <td><strong style={{ color: 'var(--primary-gold)' }}>{record.regNo}</strong></td>
      <td>{record.soldierId}</td>
      <td>{record.rank}</td>
      <td>{record.company}</td>
      <td><span className={`badge ${record.status}`}>{record.status}</span></td>
      <td>{record.leaveFrom || '-'}</td>
      <td>{record.leaveUpto || '-'}</td>
      <td>{record.date}</td>
      <td>
        <button 
          onClick={() => deleteRecord(record.id)}
          style={{
            background: 'var(--accent-red)',
            color: 'white',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 600
          }}
        >
          🗑️
        </button>
      </td>
    </tr>
  ))}
</tbody>

                </table>
              </div>
            )}
          </div>
        )}

        {/* Ranks Tab */}
        {activeTab === 'ranks' && (
          <div>
            <div className="form-container" style={{ marginBottom: '20px' }}>
              <div className="form-group">
                <label>Select Company</label>
                <select value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)}>
                  {companies.map(c => <option key={c} value={c}>{c} Company</option>)}
                </select>
              </div>
            </div>

            <div className="ranks-grid">
              {Object.entries(getRankStats(selectedCompany)).map(([rank, count]) => (
                <div key={rank} className="rank-card">
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>{rankIcons[rank] || '👤'}</div>
                  <div style={{ color: 'var(--primary-gold)', fontSize: '13px', fontWeight: 700, marginBottom: '4px' }}>{rank}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{count} soldiers</div>
                </div>
              ))}
            </div>

            {Object.keys(getRankStats(selectedCompany)).length === 0 && (
              <div className="empty-state">
                <p>No rank data for {selectedCompany} Company</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
          <div className="nav-icon">📊</div>
          <div className="nav-label">Dashboard</div>
        </div>
        <div className={`nav-item ${activeTab === 'attendance' ? 'active' : ''}`} onClick={() => setActiveTab('attendance')}>
          <div className="nav-icon">📋</div>
          <div className="nav-label">Attendance</div>
        </div>
        <div className={`nav-item ${activeTab === 'register' ? 'active' : ''}`} onClick={() => setActiveTab('register')}>
          <div className="nav-icon">📄</div>
          <div className="nav-label">Register</div>
        </div>
        <div className={`nav-item ${activeTab === 'ranks' ? 'active' : ''}`} onClick={() => setActiveTab('ranks')}>
          <div className="nav-icon">⭐</div>
          <div className="nav-label">Ranks</div>
        </div>
      </div>
    </div>
  );
}

export default App;
