<script>
  import EventSchedule from '$lib/components/marktingUI/eventSchedule.svelte';
  export let data;

  const blocks = data.blocksBySlot ?? {};

  const eventScheduleDefault = blocks['eventSchedule.eventScheduleDefault']?.props;
  const eventScheduleGrid2col = blocks['eventSchedule.eventScheduleGrid2col']?.props;
  const eventScheduleGrid3col = blocks['eventSchedule.eventScheduleGrid3col']?.props;
  const eventScheduleTabs = blocks['eventSchedule.eventScheduleTabs']?.props;

</script>

{#if eventScheduleDefault}
  <EventSchedule variant="eventScheduleDefault" data={eventScheduleDefault} />
{/if}
{#if eventScheduleGrid2col}
  <EventSchedule variant="eventScheduleGrid2col" data={eventScheduleGrid2col} />
{/if}
{#if eventScheduleGrid3col}
  <EventSchedule variant="eventScheduleGrid3col" data={eventScheduleGrid3col} />
{/if}
{#if eventScheduleTabs}
  <EventSchedule variant="eventScheduleTabs" data={eventScheduleTabs} />
{/if}