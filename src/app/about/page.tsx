import { Suspense } from 'react';
import { fetchExperiences } from "@/utils/experienceRenderer";
import TabsContainer from "@/components/TabsContainer";

export default async function About() {
  const experiences = await fetchExperiences();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TabsContainer experiences={experiences} />
    </Suspense>
  );
}
