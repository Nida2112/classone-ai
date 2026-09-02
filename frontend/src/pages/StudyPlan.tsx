import { useEffect, useState } from "react";
import { fetchCurriculum } from "../api";

type PlanItem = {
topicId: string;
recommendedActivity: string;
reason: string;
};

function StudyPlan() {
const studentId = "student-demo-1";

const [plan, setPlan] = useState<PlanItem[]>([]);
const [curriculum, setCurriculum] = useState<any>(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
async function loadPlan() {
try {
const [planResponse, curriculumData] =
await Promise.all([
fetch(
`http://localhost:4000/api/planning/student/${studentId}/today`
),
fetchCurriculum(),
]);


    if (!planResponse.ok) {
      throw new Error("Failed to fetch study plan");
    }

    const planData = await planResponse.json();

    setPlan(planData);
    setCurriculum(curriculumData);
  } catch (error) {
    console.error("Study plan error:", error);
  } finally {
    setLoading(false);
  }
}

loadPlan();


}, []);

if (loading) {
return ( <div className="dashboard"> <h2>Loading your study plan...</h2> </div>
);
}

const getTopicName = (topicId: string) => {
const topic = curriculum?.topics?.find(
(item: any) => item.id === topicId
);

return topic?.name || topicId;


};

return ( <div className="dashboard"> <header className="topbar"> <div> <p className="eyebrow">PERSONALIZED LEARNING</p> <h2>Today's Study Plan 📅</h2> <p className="subtitle">
Your learning activities are selected based on your progress. </p> </div> </header>

```
  <section className="hero-card">
    <div>
      <p className="hero-label">TODAY'S MISSION</p>

      <h3>
        {plan.length > 0
          ? "Let's strengthen your weak topics."
          : "You're all caught up!"}
      </h3>

      <p>
        {plan.length > 0
          ? "ClassOne AI has selected activities based on your learning needs."
          : "There are no topics currently requiring practice or revision."}
      </p>
    </div>

    <div className="hero-stat">
      <strong>{plan.length}</strong>
      <span>activities</span>
    </div>
  </section>

  <section className="panel">
    <div className="panel-heading">
      <div>
        <p className="eyebrow">RECOMMENDED FOR YOU</p>
        <h3>Personalized activities</h3>
      </div>
    </div>

    {plan.length === 0 ? (
      <div className="card">
        <h3>🎉 No activities for today</h3>
        <p>
          Keep learning and complete more assessments to receive
          personalized recommendations.
        </p>
      </div>
    ) : (
      <div className="dashboard-grid">
        {plan.map((item) => (
          <div className="card" key={item.topicId}>
            <p className="eyebrow">
              {item.recommendedActivity.toUpperCase()}
            </p>

            <h3>{getTopicName(item.topicId)}</h3>

            <p>{item.reason}</p>

            <button className="primary-button">
              Start {item.recommendedActivity} →
            </button>
          </div>
        ))}
      </div>
    )}
  </section>
</div>

);
}

export default StudyPlan;