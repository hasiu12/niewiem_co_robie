const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const { Sequelize, DataTypes } = require('sequelize');
const passport = require('./auth'); 

const sequelize = new Sequelize('quiz_database', 'root', 'admin', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log,
});


const Quiz = sequelize.define('Quiz', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: DataTypes.STRING
}, {
  tableName: 'quizzes',
  timestamps: false
});

const Question = sequelize.define('Question', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  quiz_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Quiz,
      key: 'id'
    }
  },
  question: DataTypes.TEXT,
  correct_answer: DataTypes.STRING,
  image_url: DataTypes.STRING,
  image_description: DataTypes.STRING,
  note: DataTypes.STRING
}, {
  tableName: 'questions',
  timestamps: false
});

const Answer = sequelize.define('Answer', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  question_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Question,
      key: 'id'
    }
  },
  answer: DataTypes.TEXT
}, {
  tableName: 'answers',
  timestamps: false
});

Quiz.hasMany(Question, { foreignKey: 'quiz_id' });
Question.belongsTo(Quiz, { foreignKey: 'quiz_id' });

Question.hasMany(Answer, { foreignKey: 'question_id' });
Answer.belongsTo(Question, { foreignKey: 'question_id' });

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());


app.get('/api/quizzes', async (req, res) => {
  const quizzes = await Quiz.findAll();
  res.json(quizzes);
});

app.get('/api/quizzes/:quiz_id/questions', async (req, res) => {
  try {
    const questions = await Question.findAll({ 
      where: { quiz_id: req.params.quiz_id },
      include: [ Answer ], 
      limit: 3 
    });
    res.json(questions);
  } catch (error) {
    console.error('Sequelize error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/questions/:question_id/answers', async (req, res) => {
  const answers = await Answer.findAll({ where: { question_id: req.params.question_id } });
  res.json(answers);
});

app.get('/api/quizzes/:quiz_id/summary', async (req, res) => {
  try {
    const questions = await Question.findAll({
      where: { quiz_id: req.params.quiz_id },
      include: [{
        model: Answer,
        where: { answer: Sequelize.col('question.correct_answer') },
        required: true
      }]
    });
    res.json(questions);
  } catch (error) {
    console.error('Sequelize error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/login', 
 // passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
   // res.redirect('/');
   res.status(200).json({ error: 'xD' });
  });

app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

app.listen(4000, () => console.log('Server started on port 4000'));




