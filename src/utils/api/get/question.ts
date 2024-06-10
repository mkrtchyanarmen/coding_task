import axios from "axios";

// TODO: will be moved in env
const baseUrl = "https://opentdb.com";
const getQuestionUrl = `${baseUrl}/api.php`;

const shuffleArray = (arr: string[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export type QuestionResponseType = {
  type: "multiple"; // TODO: should be enum
  difficulty: "hard"; // TODO: should be enum
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type QuestionType = {
  id: string;
  question: string;
  answers: string[];
};

export const getQuestions = async () => {
  const data = await axios<{ results: QuestionResponseType[] }>(
    getQuestionUrl,
    {
      params: { amount: 10 },
    }
  );

  const answers: Record<string, string> = {};

  const questions = data.data.results.map<QuestionType>(
    ({ question, correct_answer, incorrect_answers }) => {
      const id = crypto.randomUUID();
      answers[id] = correct_answer;

      return {
        id,
        question,
        answers: shuffleArray([correct_answer, ...incorrect_answers]),
      };
    }
  );

  return { questions, answers };
};
