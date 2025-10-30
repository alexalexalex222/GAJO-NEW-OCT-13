import siteContent from '@/lib/content';
import Hero from '@/components/Hero';
import ProblemProof from '@/components/ProblemProof';
import ServiceLadder from '@/components/ServiceLadder';
import Scoreboard from '@/components/Scoreboard';
import LaunchTimeline from '@/components/LaunchTimeline';
import Deliverables from '@/components/Deliverables';
import Metrics from '@/components/Metrics';
import PricingCalculator from '@/components/PricingCalculator';
import FAQ from '@/components/FAQ';
import LeadForm from '@/components/LeadForm';

export default function HomePage() {
  return (
    <>
      <Hero hero={siteContent.hero} />
      <ProblemProof problem={siteContent.problem} />
      <ServiceLadder services={siteContent.services} />
      <Scoreboard scoreboard={siteContent.scoreboard} />
      <LaunchTimeline timeline={siteContent.timeline} />
      <Deliverables deliverables={siteContent.deliverables} />
      <Metrics metrics={siteContent.metrics} />
      <PricingCalculator pricing={siteContent.pricing} />
      <FAQ faq={siteContent.faq} />
      <LeadForm form={siteContent.form} />
    </>
  );
}
