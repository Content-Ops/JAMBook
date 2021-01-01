<script>
  import logfile from '../../logfile.json';
  import { onMount } from 'svelte';
  import { documentTargetLength, wordsPerDay } from '../stores';

  let entryWithWords = [];

  onMount(() => {
    Object.entries(logfile).map(([filename, timestampKeys]) => {
      let newestTimestamp = Object.keys(timestampKeys)[
        Object.keys(timestampKeys).length - 1
      ];
      entryWithWords = [
        ...entryWithWords,
        { [filename]: timestampKeys[newestTimestamp] },
      ];
    });
  });
</script>

<div class="flex card">
  <div class="w-1/2 p-2">
    <label>
      <div>Words per day</div>
      <input type="number" bind:value="{$wordsPerDay}" min="1" />
    </label>

    <label>
      <div>Document target length</div>
      <input type="number" bind:value="{$documentTargetLength}" min="1" />
    </label>
  </div>

  <div class="w-1/2 p-2">
    {#if entryWithWords.length > 0}
      {#each Object.entries(entryWithWords) as [_filename, timestampKeys]}
        <div>{Object.keys(timestampKeys)}</div>
        <progress
          value="{timestampKeys[Object.keys(timestampKeys)].currentWords}"
          max="{$documentTargetLength}"
        ></progress>
        {#if timestampKeys[Object.keys(timestampKeys)].currentWords >= $documentTargetLength}
          Youre a boss!
        {/if}
      {/each}
    {/if}
  </div>
</div>
