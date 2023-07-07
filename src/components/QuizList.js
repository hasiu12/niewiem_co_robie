import React, { useState, useEffect } from 'react';

function QuizList({ selectQuiz }) {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetch('/api/quizzes')
      .then(response => response.json())
      .then(data => setQuizzes(data));
  }, []);

  return (
    <div>
      <h1>Available Quizzes</h1>
      {quizzes.map(quiz => (
        <button key={quiz.id} onClick={() => selectQuiz(quiz)}>
          {quiz.name}
        </button>
      ))}
    </div>
  );
}

export default QuizList;