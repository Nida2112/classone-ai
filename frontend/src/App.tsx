import { useEffect, useState } from "react";
import {
  fetchStudent,
  fetchProgress,
} from "./api";
import "./App.css";

const DEMO_STUDENT_ID = "student-demo-1";

type Student = {
  id: string;
  name: string;
  classLevel: number;
  board: string;
};

type ProgressItem = {
  topicId: string;
  state: string;
  mastery: number;
};

function App() {
  const [student, setStudent] = useState<Student | null>(null);
  const [progress, setProgress] = useState<ProgressItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [studentData, progressData] =
          await Promise.all([
            fetchStudent(DEMO_STUDENT_ID),
            fetchProgress(DEMO_STUDENT_ID),
          ]);

        setStudent(studentData);
        setProgress(progressData);
      } catch (err) {
        console.error(err);
        setError("Unable to load your ClassOne data.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <main className="app">
        <div className="loading">
          Loading ClassOne...
        </div>
      </main>
    );
  }

  if (error || !student) {
    return (
      <main className="app">
        <div className="error">
          {error || "Student not found."}
        </div>
      </main>
    );
  }

  const mastered = progress.filter(
    (item) => item.state === "MASTERED"
  ).length;

  const needsPractice = progress.filter(
    (item) => item.state === "NEEDS_PRACTICE"
  );

  const averageMastery =
    progress.length > 0
      ? Math.round(
          progress.reduce(
            (sum, item) => sum + item.mastery,
            0
          ) / progress.length
        )
      : 0;

  return (
    <main className="app">
      <div className="dashboard">

        {/* Header */}
        <header className="header">
          <div>
            <p className="eyebrow">
              CLASSONE AI
            </p>

            <h1>
              Good afternoon, {student.name} 👋
            </h1>

            <p className="subtitle">
              Class {student.classLevel} • {student.board}
            </p>
          </div>

          <div className="student-badge">
            {student.name.charAt(0)}
          </div>
        </header>

        {/* Stats */}
        <section className="stats">

          <div className="stat-card">
            <span>Average Mastery</span>
            <strong>{averageMastery}%</strong>
          </div>

          <div className="stat-card">
            <span>Topics Mastered</span>
            <strong>{mastered}</strong>
          </div>

          <div className="stat-card">
            <span>Needs Practice</span>
            <strong>{needsPractice.length}</strong>
          </div>

        </section>

        {/* Today's Mission */}
        <section className="mission">
          <div>
            <p className="eyebrow">
              TODAY'S MISSION
            </p>

            <h2>
              Keep building your understanding.
            </h2>

            <p>
              ClassOne will guide you toward the
              topics that need your attention.
            </p>
          </div>

          <button>
            Start Learning →
          </button>
        </section>

        {/* Learning Areas */}
        <section className="section">

          <div className="section-header">
            <div>
              <p className="eyebrow">
                LEARNING
              </p>

              <h2>
                Areas that need attention
              </h2>
            </div>
          </div>

          {needsPractice.length === 0 ? (
            <div className="empty-card">
              🎉 You're doing great!
              <br />
              No topics currently need practice.
            </div>
          ) : (
            <div className="topic-list">
              {needsPractice.map((item) => (
                <div
                  className="topic-card"
                  key={item.topicId}
                >
                  <div>
                    <h3>{item.topicId}</h3>

                    <p>
                      This topic needs more practice.
                    </p>
                  </div>

                  <div className="mastery">
                    {item.mastery}%
                  </div>
                </div>
              ))}
            </div>
          )}

        </section>

        {/* Footer */}
        <footer>
          ClassOne AI • Your personalized SSC learning
          companion
        </footer>

      </div>
    </main>
  );
}

export default App;