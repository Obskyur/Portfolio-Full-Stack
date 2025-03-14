'use client'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/Tabs"
import Experience from "@/components/Experience";
import '@/styles/Tabs.css'

export default function TabsDemo() {

  return (
  <Tabs defaultValue="professional" className="tabs">
    <TabsList className="grid w-full grid-cols-2">
      <TabsTrigger value="professional">Professional</TabsTrigger>
      <TabsTrigger value="personal">Personal</TabsTrigger>
    </TabsList>
    <TabsContent value="professional">
        <Experience
          title="B.S. in Software Engineering"
          start="Aug 2022"
          end="Ongoing"
          company="Washington State University"
          location="Pullman, WA"
        >
          
        </Experience>
    </TabsContent>
    <TabsContent value="personal">
      Now viewing Personal
    </TabsContent>
  </Tabs>
  );
}
