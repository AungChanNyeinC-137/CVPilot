import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "~/constants";
import ResumeCard from "~/components/ResumeCard";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { usePuterStore } from "~/lib/puter";
export function meta({ }: Route.MetaArgs) {
  return [
    { title: "CVPilot" },
    { name: "description", content: "AI powered Resume Analyzer" },
  ];
}

export default function Home() {
  const { isLoading, auth } = usePuterStore(); //usePuterStore has isLoading state
  const location = useLocation();
  const next = location.search.split('next=')[1];
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) navigate('/auth?next=/')
  }, [auth.isAuthenticated, next])

  return <main className="bg-[url('/images/bg-main.png')] bg-cover">
    <Navbar />
    <section className="main-section">
      <div className="page-heading py-16">
        <h1>Track your Applications and  Resume Ratings</h1>
        <h2>Review your submissions and cheke AI-powered feedback.</h2>

      </div>

      {resumes.length > 0 && (<div className="resumes-section">
        {resumes.map((resume) => (
          <ResumeCard
            key={resume.id}
            resume={resume} />
        ))}
      </div>)}
    </section>
  </main>;
}
