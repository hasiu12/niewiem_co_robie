import React, { useContext, useState, useEffect } from 'react';
import QuizContext from './QuizContext';

import Quiz1Summary from './podsumowanie/Quiz1Summary';
import Quiz2Summary from './podsumowanie/Quiz2Summary';

import { useNavigate } from 'react-router-dom';

const QuizSummary = () => {
  const { quizName, questions, userAnswers, setUserAnswers, quizId, setQuizId, setCurrentQuestionIndex } = useContext(QuizContext);
  const navigate = useNavigate();
  const [showQuestions, setShowQuestions] = useState(false);

  useEffect(() => {
    if (!questions.length) {
      navigate('/');
    }
  }, [questions, navigate]);

  if (questions.length !== userAnswers.length) {
    return <p>Loading question...</p>;
  }


    const correctAnswers = questions.filter(
      (question, index) => Number(question.correct_answer) === userAnswers[index]).length;

    const getAnswerColor = (question, answerIndex, userAnswerIndex) => {
        const correctAnswerIndex = Number(question.correct_answer);
        const selectedAnswerIndex = Number(userAnswerIndex);
    
        if (selectedAnswerIndex === correctAnswerIndex && answerIndex === correctAnswerIndex) {
            return 'green'; // Poprawna odpowiedź wybrana przez użytkownika
        } else if (selectedAnswerIndex !== correctAnswerIndex && answerIndex === correctAnswerIndex) {
            return 'green'; // Poprawna odpowiedź nie wybrana przez użytkownika
        } else if (selectedAnswerIndex !== correctAnswerIndex && answerIndex === selectedAnswerIndex) {
            return 'red'; // Niepoprawna odpowiedź wybrana przez użytkownika
        } else {
            return 'black'; // Pozostałe przypadki
        }
    };
    
    const handleRestart = () => {
      setCurrentQuestionIndex(0); // Ustawienie indeksu aktualnego pytania na 0
      setUserAnswers([]); // Wyczyszczenie odpowiedzi użytkownika
      navigate(`/quiz/${quizId}`); // Przekierowanie do początku quizu
    };

    const handleMenu = () => {
      setCurrentQuestionIndex(0); // Ustawienie indeksu aktualnego pytania na 0
      setUserAnswers([]); // Wyczyszczenie odpowiedzi użytkownika
      setQuizId(null); // Resetowanie wybranego quizu
      navigate('/'); // Przekierowanie do strony głównej
    };

  const toggleQuestions = () => {
    setShowQuestions(!showQuestions);
  };

  switch (quizName) {
    case 'niskopziomwka':
    case 'systemy_operacyjne':
      return (
        <div>
          <Quiz1Summary />
        </div>
      );
      case 'paradygmatynowe':
        return (
          <div>
            <Quiz2Summary />
          </div>
        );
    default:
      return (
        <div>
          <h1>Quiz Summary</h1>
          <p>You answered {correctAnswers} out of {questions.length} questions correctly!</p>
          <button onClick={handleRestart}>RestartQuiz</button>
          <button onClick={handleMenu}>Menu</button>
          <button onClick={toggleQuestions}>{showQuestions ? 'Hide Questions' : 'Show Questions'}</button>
          {showQuestions && questions.map((question, index) => (
            <div key={question.id}>
              <h2>{question.question}</h2>
                {question.Answers.map((answer, answerIndex) => (
                    <p 
                        key={answer.id} 
                        style={{ color: getAnswerColor(question, answerIndex, userAnswers[index]) }}
                    >
                        {answer.answer}
                    </p>
                ))}
              <p>Your answer: {userAnswers[index].answer}</p>
              <p>Correct answer: {question.correct_answer}</p>
            </div>
          ))}
          </div>
        );
        }
};

export default QuizSummary;
