<script>
  import Jumbotron from '$lib/components/marketingUI/jumbotron.svelte';
  export let data;

  const blocks = data.blocksBySlot ?? {};

  const jumbotronDefault = blocks['jumbotron.jumbotronDefault']?.props;
  const jumbotronBackgroundImage = blocks['jumbotron.jumbotronBackgroundImage']?.props;
  const jumbotronVideo = blocks['jumbotron.jumbotronVideo']?.props;
  const jumbotronAutForm = blocks['jumbotron.jumbotronAutForm']?.props;
  const jumbotronGradientBackground = blocks['jumbotron.jumbotronGradientBackground']?.props;
  const jumbotronCards = blocks['jumbotron.jumbotronCards']?.props;
</script>

{#if jumbotronDefault}
  <Jumbotron variant="jumbotronDefault" data={jumbotronDefault} />
{/if}
{#if jumbotronBackgroundImage}
  <Jumbotron variant="jumbotronBackgroundImage" data={jumbotronBackgroundImage} />
{/if}
{#if jumbotronVideo}
  <Jumbotron variant="jumbotronVideo" data={jumbotronVideo} />
{/if}
{#if jumbotronAutForm}
  <Jumbotron variant="jumbotronAutForm" data={jumbotronAutForm} />
{/if}
{#if jumbotronGradientBackground}
  <Jumbotron variant="jumbotronGradientBackground" data={jumbotronGradientBackground} />
{/if}
{#if jumbotronCards}
  <Jumbotron variant="jumbotronCards" data={jumbotronCards} />
{/if}