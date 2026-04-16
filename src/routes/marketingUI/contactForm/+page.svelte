<script>
  import ContactForm from '$lib/components/marketingUI/contactForm.svelte';
  export let data;

  const blocks = data.blocksBySlot ?? {};

  const contactSection = blocks['contactForm.contactSection']?.props;
  const contactHelpCenter = blocks['contactForm.contactHelpCenter']?.props;
  const contactSectionSideInfo = blocks['contactForm.contactSectionSideInfo']?.props;
  const contactSectionImage = blocks['contactForm.contactSectionImage']?.props;
</script>

<div>
  {#if contactSection}
    <ContactForm variant="contactSection" data={contactSection} />
  {/if}
  {#if contactHelpCenter}
    <ContactForm variant="contactHelpCenter" data={contactHelpCenter} />
  {/if}
  {#if contactSectionSideInfo}
    <ContactForm variant="contactSectionSideInfo" data={contactSectionSideInfo} />
  {/if}
  {#if contactSectionImage}
    <ContactForm variant="contactSectionImage" data={contactSectionImage} />
  {/if}
</div>