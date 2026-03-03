import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespace ? `https://${codespace}-8000.app.github.dev/api/leaderboard/` : 'http://localhost:8000/api/leaderboard/';

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Leaderboard API:', apiUrl);
        console.log('Leaderboard data:', data);
        setLeaderboard(data.results || data);
      });
  }, [apiUrl]);

  return (
    <div className="card mb-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h2 className="h4 mb-0">Leaderboard</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>Show Modal</button>
      </div>
      <div className="card-body">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Team</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, idx) => (
              <tr key={entry._id || idx}>
                <td>{entry.team}</td>
                <td>{entry.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Bootstrap Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Leaderboard Modal</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>This is a Bootstrap modal example for Leaderboard.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Leaderboard;
