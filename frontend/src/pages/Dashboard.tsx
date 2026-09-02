import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchStudent,
  fetchProgress,
  fetchCurriculum,
} from "../api";

function Dashboard() {
  const navigate = useNavigate();
  const studentId = "student-demo-1";

  const [student, setStudent] = useState<any>(null);
  const [progress, setProgress] = useState<any[]>([]);
  const [curriculum, setCurriculum] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [studentData, progressData, curriculumData] =
          await Promise.all([
            fetchStudent(studentId),
            fetchProgress(studentId),
            fetchCurriculum(),
          ]);

        setStudent(studentData);
        setProgress(progressData);
        setCurriculum(curriculumData);
      } catch (err) {
        console.error(err);
        setError("Unable to load your learning data.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="dashboard">
        <h2>Loading your dashboard...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <h2>Something went wrong</h2>
        <p>{error}</p>
      </div>
    );
  }

  const overallProgress =
    progress.length > 0
      ? Math.round(
          progress.reduce(
            (total, item) => total + item.progress,
            0
          ) / progress.length
        )
      : 0;

  const studentSubjects =
    curriculum?.subjects?.filter(
      (subject: any) =>
        subject.classLevel === student?.classLevel
    ) || [];

  return (
    <div className="dashboard">
      <header className="topbar">
        <div>
          <p className="eyebrow">STUDENT DASHBOARD</p>

          <h2>
            Good morning, {student?.name || "Student"} 👋
          </h2>

          <p className="subtitle">
            Let's keep your learning momentum going.
          </p>
        </div>

        <div className="topbar-profile">
          <div className="avatar">A</div>

          <div>
            <strong>{student?.name}</strong>

            <span>
              Class {student?.classLevel} • {student?.board}
            </span>
          </div>
        </div>
      </header>

      <section className="hero-card">
        <div>
          <p className="hero-label">TODAY'S LEARNING</p>

          <h3>Your study plan is ready.</h3>

          <p>
            Continue your assigned lessons, practice weak topics,
            and complete today's assessment.
          </p>

          <button
            className="primary-button"
            onClick={() => navigate("/study-plan")}
          >
            View Study Plan →
          </button>
        </div>

        <div className="hero-stat">
          <strong>45</strong>
          <span>min today</span>
        </div>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <span>Overall Progress</span>
          <strong>{overallProgress}%</strong>
          <small>↑ 8% this week</small>
        </div>

        <div className="stat-card">
          <span>Topics Mastered</span>

          <strong>
            {
              progress.filter(
                (item) => item.state === "MASTERED"
              ).length
            }
          </strong>

          <small>Keep going!</small>
        </div>

        <div className="stat-card">
          <span>Assessments</span>
          <strong>8</strong>
          <small>2 upcoming</small>
        </div>

        <div className="stat-card">
          <span>Study Streak</span>
          <strong>6 days</strong>
          <small>Personal best!</small>
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">CONTINUE LEARNING</p>
              <h3>Your subjects</h3>
            </div>

            <button
              className="text-button"
              onClick={() => navigate("/learn")}
            >
              View all
            </button>
          </div>

          <div className="subject-list">
            {studentSubjects.map((subject: any) => {
              const subjectTopics =
                curriculum?.topics?.filter((topic: any) => {
                  const chapter =
                    curriculum?.chapters?.find(
                      (chapter: any) =>
                        chapter.id === topic.chapterId
                    );

                  return chapter?.subjectId === subject.id;
                }) || [];

              const subjectProgress = progress.filter(
                (item: any) =>
                  subjectTopics.some(
                    (topic: any) =>
                      topic.id === item.topicId
                  )
              );

              const percentage =
                subjectProgress.length > 0
                  ? Math.round(
                      subjectProgress.reduce(
                        (total: number, item: any) =>
                          total + item.progress,
                        0
                      ) / subjectProgress.length
                    )
                  : 0;

              return (
                <div
                  className="subject-row"
                  key={subject.id}
                >
                  <div className="subject-icon">
                    {subject.name.charAt(0)}
                  </div>

                  <div className="subject-info">
                    <strong>{subject.name}</strong>

                    <span>
                      {subjectTopics.length > 0
                        ? `${subjectTopics.length} topics`
                        : "No topics available yet"}
                    </span>

                    <div className="progress-track">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </div>

                  <strong>{percentage}%</strong>
                </div>
              );
            })}
          </div>
        </div>

        <div className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">AI TUTOR</p>
              <h3>Need help?</h3>
            </div>
          </div>

          <div className="tutor-card">
            <div className="tutor-icon">🤖</div>

            <h4>Ask ClassOne AI</h4>

            <p>
              Stuck on a difficult concept? Your AI tutor
              can explain it step by step using your curriculum.
            </p>

            <button
              className="primary-button"
              onClick={() => navigate("/ai-tutor")}
            >
              Open AI Tutor →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;