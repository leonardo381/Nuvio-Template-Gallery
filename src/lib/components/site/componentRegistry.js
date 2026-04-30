import Breadcrumb from '$lib/components/coreUI/breadcrumb.svelte';
import CookieConsent from '$lib/components/coreUI/cookieConsent.svelte';
import Features from '$lib/components/coreUI/features.svelte';
import InformationPage from '$lib/components/coreUI/informationPage.svelte';
import Popup from '$lib/components/coreUI/popup.svelte';

import Accordion from '$lib/components/marketingUI/accordion.svelte';
import Card from '$lib/components/marketingUI/card.svelte';
import Carousel from '$lib/components/marketingUI/carousel.svelte';
import ContactForm from '$lib/components/marketingUI/contactForm.svelte';
import ContentSection from '$lib/components/marketingUI/contentSection.svelte';
import CTAsection from '$lib/components/marketingUI/ctaSection.svelte';
import CustomerLogos from '$lib/components/marketingUI/customerLogos.svelte';
import DeviceMockup from '$lib/components/marketingUI/deviceMockup.svelte';
import EventSchedule from '$lib/components/marketingUI/eventSchedule.svelte';
import FAQsection from '$lib/components/marketingUI/faqSection.svelte';
import FeatureSection from '$lib/components/marketingUI/featureSection.svelte';
import Gallery from '$lib/components/marketingUI/gallery.svelte';
import HeroSection from '$lib/components/marketingUI/heroSection.svelte';
import Jumbotron from '$lib/components/marketingUI/jumbotron.svelte';
import Newsletter from '$lib/components/marketingUI/newsletter.svelte';
import Portfolio from '$lib/components/marketingUI/portfolio.svelte';
import PricingTable from '$lib/components/marketingUI/pricingTable.svelte';
import SocialProof from '$lib/components/marketingUI/socialProof.svelte';
import TeamSection from '$lib/components/marketingUI/teamSection.svelte';
import Testimonial from '$lib/components/marketingUI/testimonial.svelte';
import Timeline from '$lib/components/marketingUI/timeline.svelte';

function normalizeRegistryKey(value) {
  return `${value ?? ''}`
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, '');
}

const registryEntries = [
  ['breadcrumb', Breadcrumb],
  ['cookie', CookieConsent],
  ['cookieConsent', CookieConsent],
  ['feature', Features],
  ['features', Features],
  ['informationPage', InformationPage],
  ['popup', Popup],
  ['accordion', Accordion],
  ['card', Card],
  ['carousel', Carousel],
  ['contactForm', ContactForm],
  ['contentSection', ContentSection],
  ['ctaSection', CTAsection],
  ['customerLogos', CustomerLogos],
  ['deviceMockup', DeviceMockup],
  ['eventSchedule', EventSchedule],
  ['faqSection', FAQsection],
  ['featureSection', FeatureSection],
  ['gallery', Gallery],
  ['heroSection', HeroSection],
  ['jumbotron', Jumbotron],
  ['newsletter', Newsletter],
  ['portfolio', Portfolio],
  ['pricingTable', PricingTable],
  ['socialProof', SocialProof],
  ['teamSection', TeamSection],
  ['testimonial', Testimonial],
  ['timeline', Timeline]
];

const componentRegistry = new Map(
  registryEntries.map(([key, component]) => [normalizeRegistryKey(key), component])
);

export function resolveSiteComponent(key) {
  return componentRegistry.get(normalizeRegistryKey(key)) ?? null;
}

