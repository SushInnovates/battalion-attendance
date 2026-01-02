import { useState } from 'react';

function Register({ records, deleteRecord }) {
  const [filters, setFilters] = useState({
    company: '',
    date: ''
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredRecords = records.filter(r => {
    const matchCompany = !filters.company || r.company === filters.company;
    const matchDate = !filters.date || r.date === new Date(filters.date).toLocaleDateString('en-IN');
    return matchCompany && matchDate;
  });

  const exportToCSV = () => {
    if (records.length === 0) {
      alert('⚠️ No records to export');
      return;
    }

    let csv = 'Company,Soldier ID,Rank,Status,Check-In,Check-Out,Remarks,Date\n';
    records.forEach(record => {
      csv += `"${record.company}","${record.soldierId}","${record.rank}","${record.status}","${record.checkInTime}","${record.checkOutTime}","${record.remarks}","${record.date}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Battalion_Attendance_${new Date().toLocaleDateString('en-IN')}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <div className="form-group">
          <label>Select Company</label>
          <select name="company" value={filters.company} onChange={handleFilterChange}>
            <option value="">All Companies</option>
            <option value="Alpha">Alpha Company</option>
            <option value="Bravo">Bravo Company</option>
            <option value="Charlie">Charlie Company</option>
          </select>
        </div>

        <div className="form-group">
          <label>Select Date</label>
          <input type="date" name="date" value={filters.date} onChange={handleFilterChange} />
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
                <th>Reg No</th>
                <th>Rank</th>
                <th>Name</th>
                <th>Status</th>
                <th>In/Out</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record, index) => (
                <tr key={record.id}>
                  <td>{index + 1}</td>
                  <td>{record.soldierId}</td>
                  <td>{record.rank}</td>
                  <td>{record.soldierId}</td>
                  <td><span className={`badge ${record.status}`}>{record.status}</span></td>
                  <td>{record.checkInTime || '-'}/{record.checkOutTime || '-'}</td>
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
                        fontSize: '12px'
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Register;
