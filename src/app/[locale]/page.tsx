import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import BasicInfo from '@/components/BasicInfo';
import HoursSection from '@/components/HoursSection';
import TicketsSection from '@/components/TicketsSection';
import InfoListSection from '@/components/InfoListSection';
import TransportSection from '@/components/TransportSection';
import RouteSection from '@/components/RouteSection';
import InfoSection from '@/components/InfoSection';
import PhotoSpotsSection from '@/components/PhotoSpotsSection';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import FAQSection from '@/components/FAQSection';
import MapEmbed from '@/components/MapEmbed';
import Footer from '@/components/Footer';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <BasicInfo />
        <HoursSection />
        <TicketsSection />
        <InfoListSection sectionKey="amenities" />
        <InfoListSection sectionKey="parking" alternate />
        <InfoListSection sectionKey="foodDrink" />
        <InfoListSection sectionKey="lodging" alternate />
        <InfoListSection sectionKey="services" />
        <TransportSection />
        <RouteSection />
        <InfoSection />
        <PhotoSpotsSection />
        <InfoListSection sectionKey="photoEtiquette" alternate />
        <Gallery />
        <Reviews />
        <FAQSection />
        <MapEmbed />
      </main>
      <Footer />
    </>
  );
}
