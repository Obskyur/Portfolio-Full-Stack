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
import { useEffect, useState } from 'react';
import getExperiences from "@/utils/experienceRenderer";

export default function TabsDemo() {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    async function fetchExperiences() {
      const foundExperiences = await getExperiences();
      setExperiences(foundExperiences);
    }
    fetchExperiences();
  }, []);

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
        {experiences.map(exp => (
          <Experience
            key={exp.key}
            title={exp.title}
            start={exp.start}
            end={exp.end}
            company={exp.company}
            location={exp.location}
            content={exp.content}
          />
        ))}
      </TabsContent>
      <TabsContent value="personal">
        Now viewing Personal
      </TabsContent>
    </Tabs>
  );
}
