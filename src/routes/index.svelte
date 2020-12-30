<script>
  import { onMount } from 'svelte';
  import logfile from '../../logfile.json';
  import CustomFullCalendar from '../components/CustomFullCalendar.svelte';
  import DayDetailView from '../components/DayDetailView.svelte';
  import WordCountDetailView from '../components/WordCountDetailView.svelte';
  import { fileCounts } from '../stores';

  onMount(() => {
    fileCounts.set(logfile);
  });
</script>

<svelte:head>
  <title>Word count per day</title>
</svelte:head>

<div class="container">
  <div class="flex flex-wrap -m-2">
    <div class="w-full p-2 md:w-1/2">
      <CustomFullCalendar />
    </div>

    <div class="w-full p-2 md:w-1/2">
      <DayDetailView />
    </div>

    <div class="w-full p-2">
      <WordCountDetailView />
    </div>
  </div>
</div>
