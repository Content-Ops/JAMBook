<script>
  import { selectedDateStr, selectedDate, wordsPerDay } from '../stores';
  import { formatDate } from '../helpers';
  import logfile from '../../logfile.json';
  import { usePrevious } from 'svelte-previous';

  let filesWithNewWordCount = [];

  let totalWordsWrittenPerDay = 0;

  const [currentDateStr, previousDateStr] = usePrevious($selectedDateStr);

  $: $currentDateStr = $selectedDateStr;

  $: if ($previousDateStr && $currentDateStr !== $previousDateStr) {
    filesWithNewWordCount = [];
    totalWordsWrittenPerDay = 0;
  }

  $: Object.entries(logfile).map(([filename, timestampKeys]) => {
    let foundTimestamps = Object.keys(timestampKeys)
      // We want to make sure to show the file diffs in chronological order
      .sort()
      .filter((value) => value.includes($selectedDateStr));

    for (let i = 0; i < foundTimestamps.length; i++) {
      filesWithNewWordCount = [
        ...filesWithNewWordCount,
        { [filename]: timestampKeys[foundTimestamps[i]] },
      ];
      totalWordsWrittenPerDay += timestampKeys[foundTimestamps[i]].diff;
    }
  });

  $: formattedDate = $selectedDate
    ? formatDate($selectedDate)
    : 'No date selected';
</script>

<div class="card">
  <h2>Detail view</h2>

  {#if $selectedDate}
    <p>{formattedDate}</p>

    {#if filesWithNewWordCount.length > 0}
      {#each Object.entries(filesWithNewWordCount) as [_filename, timestampKeys]}
        <h3>{Object.keys(timestampKeys)}</h3>
        <p
          class="{timestampKeys[Object.keys(timestampKeys)].diff > 0 ? 'text-green-700' : 'text-red-700'}"
        >
          {timestampKeys[Object.keys(timestampKeys)].diff}
        </p>
      {/each}
      <hr class="mb-4" />
      <p
        class="{totalWordsWrittenPerDay >= $wordsPerDay ? 'text-green-700' : 'text-red-700'}"
      >
        {totalWordsWrittenPerDay}
        /
        {$wordsPerDay}
        words written
      </p>
    {:else}No file changes found{/if}
  {:else}
    <p>No day selected</p>
  {/if}
</div>
