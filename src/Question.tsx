import { FC } from "react";
import { QuestionType } from "./utils/api/get/question";
import { twMerge } from "tailwind-merge";

const optionMap = {
  [0]: "A",
  [1]: "B",
  [2]: "C",
  [3]: "C",
};

const Question: FC<
  QuestionType & {
    onSelect: (id: string) => void;
    orderNumber: number;
    selectedAnswer: string | undefined;
    isTrue: boolean;
  }
> = ({ question, answers, onSelect, orderNumber, selectedAnswer, isTrue }) => {
  return (
    <div className="w-full mb-4">
      <h6 className="text-start">
        {orderNumber}. {question}
      </h6>
      <div className="flex flex-col gap-3 items-start pl-4">
        {answers.map((answer, idx) => (
          <button
            onClick={() => onSelect(answer)}
            className={twMerge(
              selectedAnswer !== answer && "text-gray-400",
              isTrue && selectedAnswer === answer && "text-green-400",
              !isTrue && selectedAnswer === answer && "text-red-400",
              !selectedAnswer && "text-blue-400"
            )}
            key={idx}
            disabled={!!selectedAnswer}
          >
            {optionMap[idx as keyof typeof optionMap]}.{answer}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
