import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import QuizContext from './QuizContext';
import { useNavigate } from 'react-router-dom';

const QuizSelection = () => {
  const { setQuizId, setQuizName } = useContext(QuizContext);
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/quizzes');
        console.log(response.data); 
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  const handleQuizSelect = (id, name) => {
    setQuizId(id);
    setQuizName(name);
    navigate(`/quiz/${id}`);
  };

  return (
    <div>
      <h1>Wybierz quiz</h1>
            {quizzes.map((quiz) => (
        <div key={quiz.id} onClick={() => handleQuizSelect(quiz.id, quiz.name)}>
          {quiz.name}
        </div>
      ))}
    </div>
  );
  
};

export default QuizSelection;
