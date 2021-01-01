<script>
  import { selectedDateStr, selectedDate } from '../stores';
  import { formatDate } from '../helpers';
  import logfile from '../../logfile.json';

  let filesWithNewWordCount = [];

  $: Object.entries(logfile).map(([filename, timestampKeys]) => {
    let foundTimestamp = Object.keys(timestampKeys)
      .sort((a, b) => (a > b ? -1 : a < b ? 1 : 0))
      .find((value) => value.includes($selectedDateStr));
    if (foundTimestamp) {
      filesWithNewWordCount = [
        ...filesWithNewWordCount,
        { [filename]: timestampKeys[foundTimestamp] },
      ];
    } else {
      filesWithNewWordCount = [];
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
        <p>{timestampKeys[Object.keys(timestampKeys)].diff}</p>
      {/each}
    {:else}No file changes found{/if}
  {:else}
    <p>No day selected</p>
  {/if}
</div>
