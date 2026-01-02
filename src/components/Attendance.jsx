import { useState } from 'react';

function Attendance({ addRecord }) {
  const [formData, setFormData] = useState({
    company: '',
    soldierId: '',
    rank: '',
    status: 'present',
    checkInTime: '',
    checkOutTime: '',
    remarks: ''
  });
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.company || !formData.soldierId || !formData.rank) {
      showAlert('⚠️ Please fill all required fields', 'error');
      return;
    }

    const record = {
      ...formData,
      date: new Date().toLocaleDateString('en-IN'),
      time: new Date().toLocaleTimeString('en-IN')
    };

    addRecord(record);
    showAlert(`✅ Attendance marked for ${formData.soldierId}!`, 'success');
    
    // Reset form
    setFormData({
      company: '',
      soldierId: '',
      rank: '',
      status: 'present',
      checkInTime: '',
      checkOutTime: '',
      remarks: ''
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {alert.show && <div className={`alert ${alert.type}`}>{alert.message}</div>}

      <div style={{ background: 'var(--card-bg)', borderLeft: '4px solid var(--primary-gold)', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
        <div style={{ color: 'var(--primary-gold)', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>TODAY'S DATE</div>
        <div style={{ color: 'var(--text-light)', fontSize: '14px' }}>
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Company</label>
          <select name="company" value={formData.company} onChange={handleChange}>
            <option value="">Select Company</option>
            <option value="Alpha">Alpha Company</option>
            <option value="Bravo">Bravo Company</option>
            <option value="Charlie">Charlie Company</option>
          </select>
        </div>

        <div className="form-group">
          <label>Soldier ID/Name</label>
          <input 
            type="text" 
            name="soldierId"
            value={formData.soldierId}
            onChange={handleChange}
            placeholder="Enter soldier ID or name"
          />
        </div>

        <div className="form-group">
          <label>Rank</label>
          <select name="rank" value={formData.rank} onChange={handleChange}>
            <option value="">Select Rank</option>
            <option value="Jawan">Jawan</option>
            <option value="Sepoy">Sepoy</option>
            <option value="Naib Subedar">Naib Subedar</option>
            <option value="Subedar">Subedar</option>
            <option value="Officer">Officer</option>
          </select>
        </div>

        <div className="form-group">
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="leave">On Leave</option>
            <option value="duty">Special Duty</option>
          </select>
        </div>

        <div className="form-group">
          <label>Check-In Time</label>
          <input 
            type="time" 
            name="checkInTime"
            value={formData.checkInTime}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Check-Out Time</label>
          <input 
            type="time" 
            name="checkOutTime"
            value={formData.checkOutTime}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Remarks/Reason</label>
          <textarea 
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            placeholder="Enter leave reason or remarks" 
            rows="3"
          />
        </div>

        <button type="submit" className="btn btn-primary">✓ Mark Attendance</button>
      </form>
    </div>
  );
}

export default Attendance;
