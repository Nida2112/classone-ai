import { useState } from "react";

function Learn() {
  const [motionCompleted, setMotionCompleted] = useState(false);

  const completeMotion = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/learning/student-demo-1/topics/topic-phy-motion-basics/progress",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            progress: 100,
            state: "MASTERED",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update progress");
      }

      setMotionCompleted(true);
    } catch (error) {
      console.error("Failed to complete topic:", error);
    }
  };
return ( <div className="dashboard"> <header className="topbar"> <div> <p className="eyebrow">LEARNING CENTER</p> <h2>Learn 📚</h2> <p className="subtitle">
Continue learning from your Class 9 FBISE curriculum. </p> </div> </header>

  <section className="panel">
    <div className="panel-heading">
      <div>
        <p className="eyebrow">YOUR SUBJECTS</p>
        <h3>Choose what you want to learn</h3>
      </div>
    </div>

    <div className="dashboard-grid">
      <div className="card">
        <h3>Mathematics</h3>
        <p>Coordinate Geometry • Algebra • Radicals</p>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: "72%" }}
          />
        </div>
        <strong>72% complete</strong>
      </div>

      <div className="card">
        <h3>Physics</h3>
        <p>Measurements • Motion • Force</p>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: "58%" }}
          />
        </div>
        <strong>58% complete</strong>
                <button
          className="primary-button"
          onClick={completeMotion}
          disabled={motionCompleted}
        >
          {motionCompleted ? "Topic Completed ✓" : "Complete Motion →"}
        </button>
      </div>

      <div className="card">
        <h3>Chemistry</h3>
        <p>Fundamentals • Atomic Structure</p>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: "64%" }}
          />
        </div>
        <strong>64% complete</strong>
      </div>

      <div className="card">
        <h3>Computer Science</h3>
        <p>Problem Solving • Algorithms</p>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: "81%" }}
          />
        </div>
        <strong>81% complete</strong>
      </div>

      <div className="card">
        <h3>English</h3>
        <p>Grammar • Comprehension • Writing</p>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: "70%" }}
          />
        </div>
        <strong>70% complete</strong>
      </div>

      <div className="card">
        <h3>Pakistan Studies</h3>
        <p>History • Geography</p>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: "55%" }}
          />
        </div>
        <strong>55% complete</strong>
      </div>
    </div>
  </section>
</div>


);
}

export default Learn;