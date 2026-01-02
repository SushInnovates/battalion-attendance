function BottomNav({ activeTab, setActiveTab }) {
  return (
    <div className="bottom-nav">
      <div 
        className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
        onClick={() => setActiveTab('dashboard')}
      >
        <div className="nav-icon">📊</div>
        <div className="nav-label">Dashboard</div>
      </div>
      <div 
        className={`nav-item ${activeTab === 'attendance' ? 'active' : ''}`}
        onClick={() => setActiveTab('attendance')}
      >
        <div className="nav-icon">📋</div>
        <div className="nav-label">Attendance</div>
      </div>
      <div 
        className={`nav-item ${activeTab === 'register' ? 'active' : ''}`}
        onClick={() => setActiveTab('register')}
      >
        <div className="nav-icon">📄</div>
        <div className="nav-label">Register</div>
      </div>
      <div 
        className={`nav-item ${activeTab === 'ranks' ? 'active' : ''}`}
        onClick={() => setActiveTab('ranks')}
      >
        <div className="nav-icon">⭐</div>
        <div className="nav-label">Ranks</div>
      </div>
    </div>
  );
}

export default BottomNav;
