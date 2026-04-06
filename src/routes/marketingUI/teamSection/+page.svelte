<script>
  import TeamSection from '$lib/components/marktingUI/teamSection.svelte';
  export let data;

  const blocks = data.blocksBySlot ?? {};

  const teamSectionDefault = blocks['teamSection.teamSectionDefault']?.props;
  const teamSectionClean = blocks['teamSection.teamSectionClean']?.props;
  const teamSectionDescription = blocks['teamSection.teamSectionDescription']?.props;
  const teamSectionCarousel = blocks['teamSection.teamSectionCarousel']?.props;
  const teamSectionCard = blocks['teamSection.teamSectionCard']?.props;
  const teamSectionOverlay = blocks['teamSection.teamSectionOverlay']?.props;
  const teamSectionCTA = blocks['teamSection.teamSectionCTA']?.props;
  const teamSectionOverlayCTA = blocks['teamSection.teamSectionOverlayCTA']?.props;
</script>

{#if teamSectionDefault}
  <TeamSection variant="teamSectionDefault" data={teamSectionDefault} />
{/if}

{#if teamSectionClean}
  <TeamSection variant="teamSectionClean" data={teamSectionClean} />
{/if}

{#if teamSectionDescription}
  <TeamSection variant="teamSectionDescription" data={teamSectionDescription} />
{/if}

{#if teamSectionCarousel}
  <TeamSection variant="teamSectionCarousel" data={teamSectionCarousel} />
{/if}

{#if teamSectionCard}
  <TeamSection variant="teamSectionCard" data={teamSectionCard} />
{/if}

{#if teamSectionOverlay}
  <TeamSection variant="teamSectionOverlay" data={teamSectionOverlay} />
{/if}

{#if teamSectionCTA}
  <TeamSection variant="teamSectionCTA" data={teamSectionCTA} />
{/if}

{#if teamSectionOverlayCTA}
  <TeamSection variant="teamSectionOverlayCTA" data={teamSectionOverlayCTA} />
{/if}
