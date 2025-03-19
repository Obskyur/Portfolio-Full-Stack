'use client'

import { useSearchParams } from 'next/navigation';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/Tabs"
import Experience from "@/components/Experience";
import '@/styles/Tabs.css'

export default function TabsContainer({ experiences }) {
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
        {experiences.map((exp) => {
          const { title, start, end, company, location, content } = exp;
          return (
          <Experience
            key={title}
            title={title}
            start={start}
            end={end}
            company={company}
            location={location}
            content={content}
          />
          )
        })}
      </TabsContent>
      <TabsContent value="personal">
        Now viewing Personal
      </TabsContent>
    </Tabs>
  );
}
  