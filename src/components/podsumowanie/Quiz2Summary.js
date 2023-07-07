import React, { useContext, useEffect, useState } from 'react';
import QuizContext from '../QuizContext';
import { useNavigate } from 'react-router-dom';

import lukaszekImg from './lukasz/lukaszek.png'; 
import lukaszek1Img from './lukasz/lukaszek1.png'; 


const Quiz2Summary = () => {
  const { questions, userAnswers, setUserAnswers, quizId, setQuizId, setCurrentQuestionIndex  } = useContext(
    QuizContext
  );
  const navigate = useNavigate();

  const [showQuestions, setShowQuestions] = useState(false);
  const [displayImg, setDisplayImg] = useState(null);

  useEffect(() => {
    if (!questions.length) {
      navigate('/');
    }
  }, [questions, navigate]);

  const correctAnswers = questions.filter(
    (question, index) => Number(question.correct_answer) === userAnswers[index]
  ).length;

  useEffect(() => {

    if (correctAnswers < questions.length*0.6) {
      setDisplayImg(lukaszekImg);
    }else {
      setDisplayImg(lukaszek1Img);
    }
  }, [correctAnswers, questions.length]);

  if (questions.length !== userAnswers.length) {
    return <p>Loading question...</p>;
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    navigate(`/quiz/${quizId}`);
  };

  const handleMenu = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizId(null);
    navigate('/');
  };

  const toggleQuestions = () => {
    setShowQuestions(!showQuestions);
  };

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

  return (
    <div>
      <h1>Quiz Summary</h1>
      <p>You answered {correctAnswers} out of {questions.length} questions correctly!</p>
      <button onClick={handleRestart}>Restart Quiz</button>
      <button onClick={handleMenu}>Menu</button>
      <div><img src={displayImg} alt="Summary" /></div>
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
};

export default Quiz2Summary;
