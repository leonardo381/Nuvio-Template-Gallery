<script>
  import FAQsection from '$lib/components/marketingUI/faqSection.svelte';
  export let data;

  const blocks = data.blocksBySlot ?? {};

  const faqSectionDefault = blocks['faqSection.faqSectionDefault']?.props;
  const faqSectionSearch = blocks['faqSection.faqSectionSearch']?.props;
  const faqSectionAccordion = blocks['faqSection.faqSectionAccordion']?.props;
  const faqSection3col = blocks['faqSection.faqSection3col']?.props;
  const faqSectionHelpCenter = blocks['faqSection.faqSectionHelpCenter']?.props;
</script>

{#if faqSectionDefault}
  <FAQsection variant="faqSectionDefault" data={faqSectionDefault} />
{/if}
{#if faqSectionSearch}
  <FAQsection variant="faqSectionSearch" data={faqSectionSearch} />
{/if}
{#if faqSectionAccordion}
  <FAQsection variant="faqSectionAccordion" data={faqSectionAccordion} />
{/if}
{#if faqSection3col}
  <FAQsection variant="faqSection3col" data={faqSection3col} />
{/if}
{#if faqSectionHelpCenter}
  <FAQsection variant="faqSectionHelpCenter" data={faqSectionHelpCenter} />
{/if}