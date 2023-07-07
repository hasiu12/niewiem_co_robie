import React, { useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import QuizContext from './QuizContext';
import { useNavigate } from 'react-router-dom';

const QuestionView = () => {
  const { quizId, questions, setQuestions, userAnswers, setUserAnswers } = useContext(QuizContext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const navigate = useNavigate();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [showPreviousButton, setShowPreviousButton] = useState(false);
  const [isLastQuestion, setIsLastQuestion] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/quizzes/${quizId}/questions`);
        setQuestions(response.data);
        setDataLoaded(true); // Ustawienie flagi na true po pobraniu danych
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [quizId, setQuestions]);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (dataLoaded && !currentQuestion) { // Sprawdzenie, czy dane zostały pobrane i czy nie ma jeszcze aktualnego pytania
      navigate('/');
    }
  }, [currentQuestion, dataLoaded, navigate]);

  const handleAnswerSelect = useCallback((answerIndex) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newUserAnswers);
  }, [currentQuestionIndex, userAnswers, setUserAnswers]);

const goToNextQuestion = useCallback(() => {
  if (userAnswers[currentQuestionIndex] !== undefined) { 
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowPreviousButton(true); 
      setIsLastQuestion(currentQuestionIndex + 1 === questions.length - 1); 
    } else {
      navigate('/summary');
    }
  }
}, [currentQuestionIndex, questions.length, navigate, userAnswers]);

  const goToPreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowPreviousButton(currentQuestionIndex - 1 > 0); // Pokaż przycisk "Poprzednie pytanie" tylko jeśli istnieje poprzednie pytanie
    }
  }, [currentQuestionIndex]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if(event.code.startsWith('Digit')) {
        const index = Number(event.code[event.code.length - 1]) - 1;
        if(index < currentQuestion.Answers.length) {
          handleAnswerSelect(index);
        }
      } else if (event.code === 'Space') {
        goToNextQuestion();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentQuestion, handleAnswerSelect, goToNextQuestion]);

  return (
    <div>
      {currentQuestion ? (
        <>
          <h1>{currentQuestion.question}</h1>
          {currentQuestion.Answers ? currentQuestion.Answers.map((answer, index) => (
            <div key={index} onClick={() => handleAnswerSelect(index)} style={{ backgroundColor: userAnswers[currentQuestionIndex] === index ? 'green' : '' }}>
              {answer.answer}
            </div>
          )) : 'Loading answers...'}
          {showPreviousButton && <button onClick={goToPreviousQuestion}>Poprzednie pytanie</button>}
          {isLastQuestion ? (
            <button onClick={() => navigate('/summary')}>Podsumowanie</button>
          ) : (
            <button onClick={goToNextQuestion}>Następne pytanie</button>
          )}
        </>
       ) : (
        'Loading question...'
      )}
    </div>
  );
};

export default QuestionView;
