import { Link } from "react-router-dom";
/*import JobCard from '../../components/Cards/cards'*/
import JobCard from "../../components/JobCards/JobCard";
import Navbar from "../../components/Navbar/Navbar";

function Jobs() {
  const jobsData = [
  
    {
      title: "AI Research Scientist",
      description:
        "Conduct research to advance the state-of-the-art in artificial intelligence. Develop algorithms and models for applications in computer vision, NLP, and reinforcement learning.",
      link: "https://jobs.futureproducts.com/apply/ai-research-scientist",
    },
    {
      title: "Senior Software Engineer - Machine Learning",
      description:
        "Work on building and optimizing machine learning models, specifically in supercomputing applications. Requires experience in software engineering, ideally in machine learning and supercomputing.",
      link: "https://careers.cloudsync.io/jobs/cloud-infrastructure-engineer",
    },
    {
      title: "Mobile Application Developer",
      description:
        "Build and optimize mobile applications for Android and iOS platforms. Proficiency in Flutter or React Native is a plus.",
      link: "https://apply.mobilitylabs.com/jobs/mobile-application-developer",
    },
    {
      title: "Machine Learning Engineer",
      description:
        "Develop and deploy machine learning models to enhance automation and intelligence in our products. Experience with TensorFlow and PyTorch is preferred.",
      link: "https://careers.innovateai.com/jobs/machine-learning-engineer",
    },
    {
      title: "Cybersecurity Analyst",
      description:
        "Protect and monitor our systems to prevent and mitigate cyber threats. Knowledge of threat intelligence, intrusion detection, and response is required.",
      link: "https://jobs.securesolutions.net/openings/cybersecurity-analyst",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="container">
        {jobsData.map((job, index) => (
          <JobCard
            key={index}
            title={job.title}
            description={job.description}
            Link={job.Link}
          />
        ))}
      </div>
    </div>
  );
}

export default Jobs;
