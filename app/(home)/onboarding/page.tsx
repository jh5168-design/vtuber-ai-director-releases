import type { Metadata } from 'next';
import { PageHero } from '@/components/page-hero';
import { SetupGuide } from '@/components/setup-guide';

export const metadata: Metadata = {
  title: 'Setup guide',
  description: 'Set up VTuber AI Director in four guided steps: model, speech input, character, and a first rehearsal.',
};

export default function OnboardingPage() {
  return (
    <>
      <PageHero
        title="Ready in four clear moves."
        lede="Set up the model, voice input, character, and rehearsal loop. Nothing is sent anywhere until you choose a model connection."
        meta={['4 steps', 'About 8 minutes, plus model downloads', 'No account required']}
      />
      <SetupGuide />
    </>
  );
}
