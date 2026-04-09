<script lang="ts">
  export let variant: string = '';
  export let data: Record<string, any> = {};
</script>

{#snippet carouselDefault(p)}
<div id="default-carousel" class="relative w-full z-0" data-carousel="slide">
    <!-- Carousel wrapper -->
    <div class="relative h-56 overflow-hidden rounded-lg md:h-96 z-0">
        {#each p.items as item}
        <div class="hidden duration-700 ease-in-out" data-carousel-item>
            <img
                src={item.src}
                class="absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2 z-0"
                alt={item.alt}
            >
        </div>
        {/each}
    </div>
    <!-- Slider indicators -->
    <div class="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse">
        {#each p.items as _, i}
        <button
            type="button"
            class="w-3 h-3 rounded-full"
            aria-current={i === 0 ? 'true' : 'false'}
            aria-label="Slide {i + 1}"
            data-carousel-slide-to={i}
        ></button>
        {/each}
    </div>
    <!-- Slider controls -->
    <button
        type="button"
        class="absolute top-0 start-0 z-10 flex h-full items-center justify-center px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
    >
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span class="sr-only">Previous</span>
        </span>
    </button>
    <button
        type="button"
        class="absolute top-0 end-0 z-10 flex h-full items-center justify-center px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
    >
        <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span class="sr-only">Next</span>
        </span>
    </button>
</div>
{/snippet}

{#if variant === 'carouselDefault'}
    {@render carouselDefault(data)}
{/if}
