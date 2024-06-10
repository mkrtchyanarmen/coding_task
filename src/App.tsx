import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { QuestionType, getQuestions } from "./utils/api/get/question";
import Question from "./Question";

// 1.User will see 10 questions with their options at once.
// 2.Options should be jumbled each time.
// 3.Each correct answer will give you 10 points,
//  and an incorrect will decrease 5 points
// 4.Whenever the user selects an option; the score should update.
// Questions API:- https://opentdb.com/api.php?amount=10

// vishal@fancraze.com

function App() {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [correctAnswers, setCorrectAnswers] = useState<Record<string, string>>(
    {}
  );

  //TODO: remove on tanStack add
  useEffect(() => {
    getQuestions().then(({ questions, answers }) => {
      setCorrectAnswers(answers);
      setQuestions(questions);
      return null;
    });
  }, []);

  const score = useMemo(() => {
    return Object.entries(answers).reduce((acc, [id, option]) => {
      if (correctAnswers[id] === option) {
        return acc + 10;
      } else {
        return acc + -5;
      }
    }, 0);
  }, [answers, correctAnswers]);

  const handleAnswerSelect = (questionId: string) => (answerId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerId }));
  };

  return (
    <div className="flex flex-col justify-start">
      {questions.map((question, idx) => (
        <Question
          {...question}
          onSelect={handleAnswerSelect(question.id)}
          key={question.id}
          orderNumber={idx + 1}
          selectedAnswer={answers[question.id]}
          isTrue={answers[question.id] === correctAnswers[question.id]}
        />
      ))}
      <div className="fixed right-3 top-3">
        <h4> Score</h4>
        <p>{score}</p>
      </div>
    </div>
  );
}

export default App;
