import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Result.css';
import ConfirmationDialog from '../components/ConfirmationDialog';

const competencyLabels = [
  'Konsisten dengan prinsip, nilai, dan keyakinan',
  'Kehandalan dalam mengungkapkan kebenaran',
  'Menjunjung tinggi kebenaran',
  'Menepati janji',
  'Bertanggung jawab atas keputusan pribadi',
  'Mengakui dan belajar dari kesalahan',
  'Siap untuk melayani orang lain',
  'Memperhatikan kesejahteraan orang lain',
  'Mampu melepaskan kesalahan pribadi',
  'Mampu memaafkan kesalahan orang lain'
];

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { competencyScores, totalScore } = location.state;
  const [isDialogOpen, setDialogOpen] = useState(false);
  const handleCloseDialog = () => setDialogOpen(false);

  const handleHomeClick = () => {
    setDialogOpen(true)
  };

  const handleConfirm = () => {
    setDialogOpen(false)
    navigate('/', { replace: true });
  }

  const getScoreDescription = () => {
    if (totalScore >= 90) return "Skor Anda Sangat Tinggi";
    if (totalScore >= 80) return "Skor Anda Tinggi";
    if (totalScore >= 60) return "Skor Anda Sedang";
    if (totalScore >= 40) return "Skor Anda Rendah";
    return "Skor Anda Sangat Rendah";
  }

  return (
    <div className="results-container">
      <main className="body">
        <div className="result-layout">
          <h1 className='title-txt'>Hasil Kuisioner</h1>
          <div className="total-score">
            <h2>Skor Kecerdasan Moral Anda: {totalScore}</h2>
            <h3>{getScoreDescription()}</h3>
          </div>
          <div className="competency-scores">
            {competencyScores.map((score, index) => (
              <div key={index} className="competency-score">
                <span>{competencyLabels[index]}: </span>
                <span>{score}</span>
              </div>
            ))}
          </div>
          <button className='btn-home' onClick={handleHomeClick}>Home</button>
          <ConfirmationDialog
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          onConfirm={handleConfirm}
          title={'Konfirmasi'}
          message={'Yakin ingin kembali ke halaman utama?'} />
        </div>
      </main>
    </div>
  );
}

export default Result;