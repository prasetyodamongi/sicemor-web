import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import CircularProgress from '@mui/material/CircularProgress';
import '../styles/Quiz.css';
import { useNavigate } from 'react-router-dom';
import ConfirmationDialog from '../components/ConfirmationDialog';

const questionToCompetency = {
  0: 0, 10: 0, 20: 0, 30: 0,
  1: 1, 11: 1, 21: 1, 31: 1,
  2: 2, 12: 2, 22: 2, 32: 2,
  3: 3, 13: 3, 23: 3, 33: 3,
  4: 4, 14: 4, 24: 4, 34: 4,
  5: 5, 15: 5, 25: 5, 35: 5,
  6: 6, 16: 6, 26: 6, 36: 6,
  7: 7, 17: 7, 27: 7, 37: 7,
  8: 8, 18: 8, 28: 8, 38: 8,
  9: 9, 19: 9, 29: 9, 39: 9
};

function Quiz() {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleCloseDialog = () => setDialogOpen(false);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        console.log("Fetching data from Firestore...");
        const querySnapshot = await getDocs(collection(db, "soal"));
        const data = querySnapshot.docs.map(doc => doc.data());
        console.log("Data fetched from Firestore:", data);
        setQuizData(data);
        setAnswers(Array(data.length).fill(null));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchQuizData();
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(Number(event.target.value));
  };

  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = selectedOption;
      setAnswers(newAnswers);
      console.log(newAnswers);

      // Move to the next question
      if (currentQuestionIndex < quizData.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        handleFinishQuestion();
      }

      // Reset selected option for next question
      setSelectedOption(newAnswers[currentQuestionIndex + 1] || null);
    } else {
      alert("Silakan pilih jawaban terlebih dahulu.");
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = selectedOption;
      setAnswers(newAnswers);
      
      // Move to the previous question
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      
      // Set selected option for the previous question
      setSelectedOption(newAnswers[currentQuestionIndex - 1] || null);
    }
  };

  const handleFinishQuestion = () => {
    if (selectedOption !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = selectedOption;
      setAnswers(newAnswers);
      console.log(newAnswers);
      setSelectedOption(null);
      setDialogOpen(true);
    } else {
      alert("Silakan pilih jawaban terlebih dahulu.");
    }
  };

  const calculateScores = () => {
    const competencyScores = Array(10).fill(0);

    answers.forEach((answer, index) => {
      if (answer !== null) {
        const competencyIndex = questionToCompetency[index];
        competencyScores[competencyIndex] += answer;
      }
    });

    // Membagi skor masing-masing kompetensi dengan 2 dan membulatkan ke bawah
    const reducedCompetencyScores = competencyScores.map(score => Math.floor(score / 2));

    // Menjumlahkan hasil skor kompetensi untuk memperoleh skor keseluruhan
    const totalScore = reducedCompetencyScores.reduce((sum, score) => sum + score, 0);

    return { competencyScores: reducedCompetencyScores, totalScore };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { competencyScores, totalScore } = calculateScores();
    navigate('/result', { state: { competencyScores, totalScore } });
    setDialogOpen(false);
  };

  console.log("Quiz data length:", quizData.length);

  if (quizData.length === 0) {
    return (
      <div className="loading-container">
        <CircularProgress sx={{ color: '#bd1120' }} />
      </div>
    );
  }

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div className="container">
      <main className="body">
        <div className="quiz-layout">
          <p className="question">{currentQuestion.soal}</p>
          <form onSubmit={handleSubmit}>
            {currentQuestion.pilihanJawaban.map((option, index) => (
              <div key={index} className="radio-group">
                <input
                  type="radio"
                  id={`custom-radio-${index}`}
                  name="custom-radio"
                  value={currentQuestion.nilaiJawaban[index]}
                  className="custom-radio"
                  checked={selectedOption === currentQuestion.nilaiJawaban[index]}
                  onChange={handleOptionChange}
                />
                <label
                  htmlFor={`custom-radio-${index}`}
                  className={`custom-radio-label ${selectedOption === currentQuestion.nilaiJawaban[index] ? 'checked' : ''}`}
                >
                  {option}
                </label>
              </div>
            ))}
            <div className="navigation-buttons">
              <button
                type="button"
                onClick={handlePreviousQuestion}
                style={{
                  visibility: currentQuestionIndex > 0 ? 'visible' : 'hidden',
                  pointerEvents: currentQuestionIndex > 0 ? 'auto' : 'none',
                  opacity: currentQuestionIndex > 0 ? 1 : 0
                }}
              >
                Sebelumnya
              </button>
              <span className="question-number">No. {currentQuestionIndex + 1}</span>
              {currentQuestionIndex < quizData.length - 1 ? (
                <button type="button" onClick={handleNextQuestion}>
                  Selanjutnya
                </button>
              ) : (
                <button type="button" onClick={handleFinishQuestion}>
                  Selesai
                </button>
              )}
            </div>
          </form>
          <ConfirmationDialog
            isOpen={isDialogOpen}
            onClose={handleCloseDialog}
            onConfirm={handleSubmit}
            title={'Konfirmasi'}
            message={'Yakin ingin menyelesaikan kuisioner?'}
          />
        </div>
      </main>
    </div>
  );
}

export default Quiz;