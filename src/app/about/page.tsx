import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/Tabs"
import Experience from "@/components/Experience";
import render from "@/utils/experienceRenderer";
import '@/styles/Tabs.css'
import fs from 'fs';
import path from 'path';

const experiencesDirectory = path.join(process.cwd(), 'src/experiences');
const experienceFiles = fs.readdirSync(experiencesDirectory).filter(file => file.endsWith('.md'));

const experiences = await Promise.all(experienceFiles.map(async (file) => {
  const experience = await render(`/src/experiences/${file}`);
  console.log(experience);
  return (
    <Experience
      key={file}
      title={experience['title']}
      start={experience['start']}
      end={experience['end']}
      company={experience['company']}
      location={experience['location']}
      content={experience.content}
    />
  );
}));

export default function TabsDemo() {

  return (
  <Tabs defaultValue="professional" className="tabs">
    <TabsList className="grid w-full grid-cols-2">
      <TabsTrigger value="professional">Professional</TabsTrigger>
      <TabsTrigger value="personal">Personal</TabsTrigger>
    </TabsList>
    <TabsContent value="professional">
      {experiences}
    </TabsContent>
    <TabsContent value="personal">
      Now viewing Personal
    </TabsContent>
  </Tabs>
  );
}
