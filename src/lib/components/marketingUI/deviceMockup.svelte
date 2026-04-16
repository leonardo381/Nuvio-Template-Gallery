<script lang="ts">
  export let variant: string = '';
  export let data: Record<string, any> = {};
</script>

{#snippet mockupPhone(p)}
<div class="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
  <div class="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
  <div class="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
  <div class="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
  <div class="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>

  <div class="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
    <img
      src={p.imageLight}
      alt={p.imageAlt}
      class="dark:hidden w-[272px] h-[572px]"
    />
    <img
      src={p.imageDark}
      alt={p.imageAlt}
      class="hidden dark:block w-[272px] h-[572px]"
    />
  </div>
</div>
{/snippet}

{#snippet mockupPhoneIOS(p)}
<div class="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
  <div class="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
  <div class="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
  <div class="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
  <div class="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>

  <div class="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
    <img
      src={p.imageLight}
      alt={p.imageAlt}
      class="dark:hidden w-[272px] h-[572px]"
    />
    <img
      src={p.imageDark}
      alt={p.imageAlt}
      class="hidden dark:block w-[272px] h-[572px]"
    />
  </div>
</div>
{/snippet}

{#snippet mockupPhoneAndroid(p)}
<div class="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-xl h-[600px] w-[300px] shadow-xl">
  <div class="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
  <div class="h-[32px] w-[3px] bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
  <div class="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
  <div class="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
  <div class="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>

  <div class="rounded-xl overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
    <img
      src={p.imageLight}
      alt={p.imageAlt}
      class="dark:hidden w-[272px] h-[572px]"
    />
    <img
      src={p.imageDark}
      alt={p.imageAlt}
      class="hidden dark:block w-[272px] h-[572px]"
    />
  </div>
</div>
{/snippet}

{#snippet mockupTablet(p)}
<div class="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[454px] max-w-[341px] md:h-[682px] md:max-w-[512px]">
  <div class="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
  <div class="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
  <div class="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
  <div class="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>

  <div class="rounded-[2rem] overflow-hidden h-[426px] md:h-[654px] bg-white dark:bg-gray-800">
    <img
      src={p.imageLight}
      alt={p.imageAlt}
      class="dark:hidden h-[426px] md:h-[654px]"
    />
    <img
      src={p.imageDark}
      alt={p.imageAlt}
      class="hidden dark:block h-[426px] md:h-[654px]"
    />
  </div>
</div>
{/snippet}

{#snippet mockupLaptop(p)}
<div>
  <div class="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]">
    <div class="rounded-lg overflow-hidden h-[156px] md:h-[278px] bg-white dark:bg-gray-800">
      <img
        src={p.imageLight}
        alt={p.imageAlt}
        class="dark:hidden h-[156px] md:h-[278px] w-full rounded-lg"
      />
      <img
        src={p.imageDark}
        alt={p.imageAlt}
        class="hidden dark:block h-[156px] md:h-[278px] w-full rounded-lg"
      />
    </div>
  </div>

  <div class="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl rounded-t-sm h-[17px] max-w-[351px] md:h-[21px] md:max-w-[597px]">
    <div
      class="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-gray-800"
    ></div>
  </div>
</div>
{/snippet}

{#snippet mockupDesktop(p)}
<div class="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[16px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]">
  <div class="rounded-xl overflow-hidden h-[140px] md:h-[262px]">
    <img
      src={p.imageLight}
      alt={p.imageAlt}
      class="dark:hidden h-[140px] md:h-[262px] w-full rounded-xl"
    />
    <img
      src={p.imageDark}
      alt={p.imageAlt}
      class="hidden dark:block h-[140px] md:h-[262px] w-full rounded-xl"
    />
  </div>
</div>

<div class="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl h-[24px] max-w-[301px] md:h-[42px] md:max-w-[512px]"></div>

<div class="relative mx-auto bg-gray-800 rounded-b-xl h-[55px] max-w-[83px] md:h-[95px] md:max-w-[142px]"></div>
{/snippet}

{#snippet mockupWatch(p)}
<div>
  <div class="relative mx-auto bg-gray-800 dark:bg-gray-700 rounded-t-[2.5rem] h-[63px] max-w-[133px]"></div>

  <div class="relative mx-auto border-gray-900 dark:bg-gray-800 dark:border-gray-800 border-[10px] rounded-[2.5rem] h-[213px] w-[208px]">
    <div class="h-[41px] w-[6px] bg-gray-800 dark:bg-gray-800 absolute -end-[16px] top-[40px] rounded-e-lg"></div>
    <div class="h-[32px] w-[6px] bg-gray-800 dark:bg-gray-800 absolute -end-[16px] top-[88px] rounded-e-lg"></div>

    <div class="rounded-[2rem] overflow-hidden h-[193px] w-[188px]">
      <img
        src={p.imageLight}
        alt={p.imageAlt}
        class="dark:hidden h-[193px] w-[188px]"
      />
      <img
        src={p.imageDark}
        alt={p.imageAlt}
        class="hidden dark:block h-[193px] w-[188px]"
      />
    </div>
  </div>

  <div class="relative mx-auto bg-gray-800 dark:bg-gray-700 rounded-b-[2.5rem] h-[63px] max-w-[133px]"></div>
</div>
{/snippet}

<!-- render only the requested snippet -->

<div>
  {#if variant === 'mockupPhone'}
    {@render mockupPhone(data)}
  {:else if variant === 'mockupPhoneIOS'}
    {@render mockupPhoneIOS(data)}
  {:else if variant === 'mockupPhoneAndroid'}
    {@render mockupPhoneAndroid(data)}
  {:else if variant === 'mockupTablet'}
    {@render mockupTablet(data)}
  {:else if variant === 'mockupLaptop'}
    {@render mockupLaptop(data)}
  {:else if variant === 'mockupDesktop'}
    {@render mockupDesktop(data)}
  {:else if variant === 'mockupWatch'}
    {@render mockupWatch(data)}
  {/if}
</div>
