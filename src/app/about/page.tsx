'use client'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/Tabs"
import Experience from "@/components/Experience";
import '@/styles/Tabs.css'
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { getStaticPaths, getStaticProps } from "@/utils/experienceRenderer";
// import getExperiences from "@/utils/experienceRenderer";

export default function TabsDemo() {
  const [paths, setPaths] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchExperiences() {
      try {
        const { paths } = await getStaticPaths();
        console.log("Found experiences: ", paths);
        setPaths(paths);
        for (const path of paths) {
          const exp = await getStaticProps(path);
          setExperiences([...experiences, exp]);
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    }
    fetchExperiences();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TabsContentWithSearchParams experiences={experiences} />
    </Suspense>
  );
}

function TabsContentWithSearchParams({ experiences }) {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const defaultTab = tab || "professional";

  return (
    <Tabs defaultValue={defaultTab} className="tabs">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="professional">Professional</TabsTrigger>
        <TabsTrigger value="personal">Personal</TabsTrigger>
      </TabsList>
      <TabsContent value="professional">
        {experiences.map(exp => 
          (
          <Experience
            key={exp.key}
            title={exp.title}
            start={exp.start}
            end={exp.end}
            company={exp.company}
            location={exp.location}
            content={exp.content}
          />
        )
        )}
      </TabsContent>
      <TabsContent value="personal">
        Now viewing Personal
      </TabsContent>
    </Tabs>
  );
}
