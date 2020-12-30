<script>
  import { fileCounts } from '../stores';

  let wordsPerDay = 100;
  let documentTargetLength = 200;
</script>

<div class="flex card">
  <div class="w-1/2 p-2">
    <label>
      <div>Words per day</div>
      <input type="number" bind:value="{wordsPerDay}" min="1" />
    </label>

    <label>
      <div>Document target length</div>
      <input type="number" bind:value="{documentTargetLength}" min="1" />
    </label>
  </div>

  <!-- <div class="w-1/2 p-2">
    {#if $fileCounts}
      {#each Object.entries($fileCounts) as [cat_key, cat_val]}
        {console.log(cat_key, cat_val)}
        <div>{cat_key}</div>
        <progress
          value="{cat_val.currentWords}"
          max="{documentTargetLength}"
        ></progress>
        {#if cat_val.currentWords >= documentTargetLength}Youre a boss!{/if}
      {/each}
    {/if}
  </div> -->
</div>
