<script>
  import Timeline from '$lib/components/marketingUI/timeline.svelte';
  export let data;

  const blocks = data.blocksBySlot ?? {};

  const timelineHorizontal =
    blocks['timeline.timelineHorizontal']?.props;

  const timelineVertical =
    blocks['timeline.timelineVertical']?.props;

  const timelineDefault =
    blocks['timeline.timelineDefault']?.props;
</script>

{#if timelineDefault}
  <Timeline variant="timelineDefault" data={timelineDefault} />
{/if}
{#if timelineVertical}
  <Timeline variant="timelineVertical" data={timelineVertical} />
{/if}
{#if timelineHorizontal}
  <Timeline variant="timelineHorizontal" data={timelineHorizontal} />
{/if}