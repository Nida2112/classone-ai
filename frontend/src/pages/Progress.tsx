import { useEffect, useState } from "react";
import {
  fetchStudent,
  fetchProgress,
  fetchCurriculum,
} from "../api";

function Progress() {
  const studentId = "student-demo-1";

  const [student, setStudent] = useState<any>(null);
  const [progress, setProgress] = useState<any[]>([]);
  const [curriculum, setCurriculum] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProgress() {
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
      } catch (error) {
        console.error("Progress loading error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProgress();
  }, []);

  if (loading) {
    return (
      <div className="dashboard">
        <h2>Loading your progress...</h2>
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

  const mastered = progress.filter(
    (item) => item.state === "MASTERED"
  ).length;

  const needsPractice = progress.filter(
    (item) => item.state === "NEEDS_PRACTICE"
  ).length;

  const needsRevision = progress.filter(
    (item) => item.state === "NEEDS_REVISION"
  ).length;

  const studentSubjects =
    curriculum?.subjects?.filter(
      (subject: any) =>
        subject.classLevel === student?.classLevel
    ) || [];

  return (
    <div className="dashboard">
      <header className="topbar">
        <div>
          <p className="eyebrow">LEARNING ANALYTICS</p>
          <h2>Your Progress 📊</h2>
          <p className="subtitle">
            Track your learning journey and see where you can improve.
          </p>
        </div>
      </header>

      <section className="stats-grid">
        <div className="stat-card">
          <span>Overall Progress</span>
          <strong>{overallProgress}%</strong>
          <small>Across all topics</small>
        </div>

        <div className="stat-card">
          <span>Topics Mastered</span>
          <strong>{mastered}</strong>
          <small>Great work!</small>
        </div>

        <div className="stat-card">
          <span>Needs Practice</span>
          <strong>{needsPractice}</strong>
          <small>Keep practicing</small>
        </div>

        <div className="stat-card">
          <span>Needs Revision</span>
          <strong>{needsRevision}</strong>
          <small>Review these topics</small>
        </div>
      </section>

      <section className="dashboard-grid">
        {studentSubjects.map((subject: any) => {
          const subjectTopics =
            curriculum?.topics?.filter((topic: any) => {
              const chapter = curriculum?.chapters?.find(
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
            <div className="panel" key={subject.id}>
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">SUBJECT</p>
                  <h3>{subject.name}</h3>
                </div>

                <strong>{percentage}%</strong>
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>

              <div style={{ marginTop: "18px" }}>
                <p>
                  {subjectProgress.length} of{" "}
                  {subjectTopics.length} topics tracked
                </p>
              </div>

              <div className="subject-list">
                {subjectProgress.map((item: any) => {
                  const topic = subjectTopics.find(
                    (topic: any) =>
                      topic.id === item.topicId
                  );

                  return (
                    <div
                      className="subject-row"
                      key={item.topicId}
                    >
                      <div className="subject-icon">
                        {topic?.name?.charAt(0) || "T"}
                      </div>

                      <div className="subject-info">
                        <strong>
                          {topic?.name || "Topic"}
                        </strong>

                        <span>
                          {item.state || "Not Started"}
                        </span>

                        <div className="progress-track">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${item.progress}%`,
                            }}
                          />
                        </div>
                      </div>

                      <strong>{item.progress}%</strong>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default Progress;