<!-- src/routes/+layout.svelte -->
<script>
  import favicon from '$lib/assets/favicon.svg';
  import '../app.css';

  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';

  async function boot() {
    // only import the ESM entry; no need for dist/*.js files
    const { initFlowbite } = await import('flowbite');
    // defer to ensure DOM is fully updated before initializing
    setTimeout(() => initFlowbite(), 0);
  }

  onMount(boot);
  afterNavigate(boot);

  import Navbar from '$lib/components/coreUI/navbar.svelte';
  import Footer from '$lib/components/coreUI/footer.svelte';

  const baseNavbar = {
    brand: {
      href: '#',
      logoSrc: 'https://flowbite.com/docs/images/logo.svg',
      logoAlt: 'Flowbite Logo',
      name: 'Flowbite'
    },
    links: [
      {
        label: 'Core UI',
        children: [
          { label: 'Breadcrumb', href: '/coreUI/breadcrumb' },
          { label: 'Cookie Consent', href: '/coreUI/cookieConsent' },
          { label: 'Footer', href: '/coreUI/' },
          { label: 'Information page', href: '/coreUI/informationPage' },
          { label: 'Navbar', href: '/coreUI/' },
          { label: 'Popup', href: '/coreUI/popup' }
        ],
      },
      {
        label: 'Markting UI',
        children: [
          { label: 'Accordion', href: '/marketingUI/accordion' },
          { label: 'Card', href: '/marketingUI/card' },
          { label: 'Carousel', href: '/marketingUI/carousel' },
          { label: 'Contact Form', href: '/marketingUI/contactForm' },
          { label: 'Content Section', href: '/marketingUI/' },
          { label: 'CTAsection', href: '/marketingUI/cTAsection' },
          { label: 'Device Mockup', href: '/marketingUI/deviceMockup' },
          { label: 'Feature Section', href: '/marketingUI/' },
          { label: 'Gallery', href: '/marketingUI/gallery' },
          { label: 'Hero Section', href: '/marketingUI/heroSection' },
          { label: 'Jumbotron', href: '/marketingUI/jumbotron' },
          { label: 'Newsletter', href: '/marketingUI/newsletter' },
          { label: 'Pricing Table', href: '/marketingUI/pricingTable' },
          { label: 'Team Section', href: '/marketingUI/' },
          { label: 'Timeline', href: '/marketingUI/timeline' },
          { label: 'Video', href: '/marketingUI/' }
        ],
      },
      { label: 'E-commerce UI', href: '#' },
      { label: 'Publisher UI', href: '#' }
    ]
  };

  let { children } = $props(); // Svelte 5
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<Navbar variant="base" data={baseNavbar} />
{@render children?.()}
<Footer />