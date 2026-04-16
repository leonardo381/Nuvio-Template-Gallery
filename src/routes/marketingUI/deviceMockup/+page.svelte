<script>
  import DeviceMockup from '$lib/components/marketingUI/deviceMockup.svelte';
  export let data;

  const blocks = data.blocksBySlot ?? {};

  const mockupPhone = blocks['deviceMockup.mockupPhone']?.props;
  const mockupPhoneIOS = blocks['deviceMockup.mockupPhoneIOS']?.props;
  const mockupPhoneAndroid = blocks['deviceMockup.mockupPhoneAndroid']?.props;
  const mockupTablet = blocks['deviceMockup.mockupTablet']?.props;
  const mockupLaptop = blocks['deviceMockup.mockupLaptop']?.props;
  const mockupDesktop = blocks['deviceMockup.mockupDesktop']?.props;
  const mockupWatch = blocks['deviceMockup.mockupWatch']?.props;
</script>

<div class="mr-24 ml-24 p-12 flex flex-col space-y-8">
  {#if mockupPhone}
    <DeviceMockup variant="mockupPhone" data={mockupPhone} />
  {/if}
  {#if mockupPhoneIOS}
    <DeviceMockup variant="mockupPhoneIOS" data={mockupPhoneIOS} />
  {/if}
  {#if mockupPhoneAndroid}
    <DeviceMockup variant="mockupPhoneAndroid" data={mockupPhoneAndroid} />
  {/if}
  {#if mockupTablet}
    <DeviceMockup variant="mockupTablet" data={mockupTablet} />
  {/if}
  {#if mockupLaptop}
    <DeviceMockup variant="mockupLaptop" data={mockupLaptop} />
  {/if}
  {#if mockupDesktop}
    <DeviceMockup variant="mockupDesktop" data={mockupDesktop} />
  {/if}
  {#if mockupWatch}
    <DeviceMockup variant="mockupWatch" data={mockupWatch} />
  {/if}
</div>