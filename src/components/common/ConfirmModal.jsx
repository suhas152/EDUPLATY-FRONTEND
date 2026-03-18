const ConfirmModal = ({ message, onConfirm, onCancel }) => (
  <div className="modal-overlay">
    <div className="modal-box">
      <p>{message}</p>
      <div className="modal-actions">
        <button className="btn btn-danger" onClick={onConfirm}>Confirm</button>
        <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  </div>
);

export default ConfirmModal;
