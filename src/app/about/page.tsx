'use client'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/Tabs"
import '@/styles/Tabs.css'

export default function TabsDemo() {

  return (
  <Tabs defaultValue="professional" className="tabs">
    <TabsList className="grid w-full grid-cols-2">
      <TabsTrigger value="professional">Professional</TabsTrigger>
      <TabsTrigger value="personal">Personal</TabsTrigger>
    </TabsList>
    <TabsContent value="professional">
      Now viewing Professional
    </TabsContent>
    <TabsContent value="personal">
      Now viewing Personal
    </TabsContent>
  </Tabs>
  );
}
