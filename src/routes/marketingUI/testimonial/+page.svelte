<script>
  import Testimonial from '$lib/components/marktingUI/testimonial.svelte';
  export let data;

  const blocks = data.blocksBySlot ?? {};

  const testimonialBlockquote = blocks['testimonial.testimonialBlockquote']?.props;
  const testimonialCards = blocks['testimonial.testimonialCards']?.props;
  const testimonialTabs = blocks['testimonial.testimonialTabs']?.props;
  const testimonialCarousel = blocks['testimonial.testimonialCarousel']?.props;
  const testimonialGrid = blocks['testimonial.testimonialGrid']?.props;
</script>

{#if testimonialBlockquote}
  <Testimonial variant="testimonialBlockquote" data={testimonialBlockquote} />
{/if}
{#if testimonialCards}
  <Testimonial variant="testimonialCards" data={testimonialCards} />
{/if}
{#if testimonialTabs}
  <Testimonial variant="testimonialTabs" data={testimonialTabs} />
{/if}
{#if testimonialCarousel}
  <Testimonial variant="testimonialCarousel" data={testimonialCarousel} />
{/if}
{#if testimonialGrid}
  <Testimonial variant="testimonialGrid" data={testimonialGrid} />
{/if}