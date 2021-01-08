<script>
  import logfile from '../../logfile.json';
  import { onMount } from 'svelte';
  import { documentTargetLength, wordsPerDay } from '../stores';
  import cookies from 'js-cookie';

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

  const handleWordsPerDayChange = () => {
    setTimeout(() => {
      cookies.set('initialWordsPerDay', $wordsPerDay);
    }, 1000);
  };

  const handledocumentTargetLengthChange = () => {
    setTimeout(() => {
      cookies.set('initialDocumentTargetLength', $documentTargetLength);
    }, 1000);
  };

  var option = {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  };
  var formatter = new Intl.NumberFormat('en-US', option);

  let formatPercentage = (value) => {
    return value > 1 ? '100%' : formatter.format(value);
  };
</script>

<div class="flex flex-wrap card">
  {#if entryWithWords.length > 0}
    <div class="w-full py-2 md:w-1/2">
      <div class="mb-3">
        <label for="wordsPerDay" class="block">Words per day</label>
        <input
          type="number"
          id="wordsPerDay"
          bind:value="{$wordsPerDay}"
          min="1"
          on:change="{handleWordsPerDayChange}"
        />
      </div>

      <label for="documentTargetLength" class="block">Document target length</label>
      <input
        type="number"
        id="documentTargetLength"
        bind:value="{$documentTargetLength}"
        min="1"
        on:change="{handledocumentTargetLengthChange}"
      />
    </div>

    <div class="w-full py-2 md:w-1/2">
      {#each Object.entries(entryWithWords) as [_filename, timestampKeys]}
        <div>{Object.keys(timestampKeys)}</div>
        <progress
          value="{timestampKeys[Object.keys(timestampKeys)].currentWords}"
          max="{$documentTargetLength}"
        ></progress>
        {formatPercentage(timestampKeys[Object.keys(timestampKeys)].currentWords / $documentTargetLength)}
      {/each}
    </div>
  {:else}
    No files found to display, did you put your blog posts under `src/posts` and
    run the `wordCount.js` script?
  {/if}
</div>
