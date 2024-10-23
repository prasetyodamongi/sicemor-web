import '../styles/Dialog.css'

// eslint-disable-next-line react/prop-types
function ConfirmationDialog({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        <h2>{title}</h2>
        <p>{message}</p>
        <button className='btn-no-ya' onClick={onClose}>Tidak</button>
        <button className='btn-no-ya' onClick={onConfirm}>Ya</button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
  },
};

export default ConfirmationDialog;
