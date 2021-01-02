<script>
  import CustomFullCalendar from '../components/CustomFullCalendar.svelte';
  import DayDetailView from '../components/DayDetailView.svelte';
  import WordCountDetailView from '../components/WordCountDetailView.svelte';
</script>

<svelte:head>
  <title>Dashboard | Content Ops</title>
</svelte:head>

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
