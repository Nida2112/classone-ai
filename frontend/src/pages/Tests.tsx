import { useEffect, useState } from "react";

type Question = {
  id: string;
  topicId: string;
  question: string;
  options: string[];
  correctAnswer: string;
};

type Attempt = {
  id: string;
  studentId: string;
  questionId: string;
  answer: string;
  correct: boolean;
};

function Tests() {
  const studentId = "student-demo-1";

  // Math Number Systems topic from the backend
  const topicId = "topic-math-number-systems";

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [result, setResult] = useState<Attempt | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadQuestions() {
      try {
        const response = await fetch(
          `http://localhost:4000/api/assessments/topic/${topicId}/questions`
        );

        if (!response.ok) {
          throw new Error("Failed to load questions");
        }

        const data = await response.json();

        setQuestions(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load the assessment.");
      } finally {
        setLoading(false);
      }
    }

    loadQuestions();
  }, []);

  const currentQuestion = questions[currentIndex];

  const submitAnswer = async () => {
    if (!selectedAnswer || !currentQuestion || submitting) {
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(
        `http://localhost:4000/api/assessments/question/${currentQuestion.id}/answer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentId,
            answer: selectedAnswer,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit answer");
      }

      const data = await response.json();

      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Unable to submit your answer.");
    } finally {
      setSubmitting(false);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((current) => current + 1);
      setSelectedAnswer("");
      setResult(null);
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <h2>Loading assessment...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <h2>Assessment unavailable</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="dashboard">
        <h2>No questions available</h2>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="topbar">
        <div>
          <p className="eyebrow">ASSESSMENT</p>

          <h2>Math Practice 📝</h2>

          <p className="subtitle">
            Test your understanding of Class 9 Number Systems.
          </p>
        </div>

        <div className="topbar-profile">
          <div className="avatar">A</div>

          <div>
            <strong>Ayesha</strong>
            <span>Class 9 • FBISE</span>
          </div>
        </div>
      </header>

      <section className="panel test-panel">
        <div className="test-progress-header">
          <div>
            <p className="eyebrow">
              QUESTION {currentIndex + 1} OF {questions.length}
            </p>

            <h3>Number Systems</h3>
          </div>

          <div className="test-progress">
            {currentIndex + 1}/{questions.length}
          </div>
        </div>

        <div className="test-question">
          <h2>{currentQuestion.question}</h2>

          <div className="answer-options">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedAnswer === option;

              return (
                <button
                  key={option}
                  className={`answer-option ${
                    isSelected ? "selected" : ""
                  }`}
                  onClick={() => {
                    if (!result) {
                      setSelectedAnswer(option);
                    }
                  }}
                  disabled={!!result}
                >
                  <span className="option-letter">
                    {String.fromCharCode(
                      65 + currentQuestion.options.indexOf(option)
                    )}
                  </span>

                  <span>{option}</span>
                </button>
              );
            })}
          </div>
        </div>

        {result && (
          <div
            className={`test-result ${
              result.correct ? "correct-result" : "wrong-result"
            }`}
          >
            <strong>
              {result.correct
                ? "✓ Correct!"
                : "✗ Not quite"}
            </strong>

            <p>
              {result.correct
                ? "Great job! You selected the correct answer."
                : `The correct answer is "${currentQuestion.correctAnswer}".`}
            </p>
          </div>
        )}

        <div className="test-actions">
          {!result ? (
            <button
              className="primary-button dark-button"
              onClick={submitAnswer}
              disabled={!selectedAnswer || submitting}
            >
              {submitting ? "Checking..." : "Submit Answer →"}
            </button>
          ) : currentIndex < questions.length - 1 ? (
            <button
              className="primary-button dark-button"
              onClick={nextQuestion}
            >
              Next Question →
            </button>
          ) : (
            <div className="test-complete">
              🎉 Assessment complete!
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Tests;