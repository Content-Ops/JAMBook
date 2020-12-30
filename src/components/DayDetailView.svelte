<script>
  import { selectedDateStr, selectedDate } from '../stores';
  import isSameDay from 'date-fns/isSameDay';

  // let hasWrittenToday = null;

  // $: hasWrittenToday = isSameDay(new Date(), new Date($selectedDate));
</script>

<div class="card">
  <h2>DETAIL VIEW</h2>

  {#if $selectedDate}
    <p>{$selectedDateStr}</p>
    <p>{$selectedDate}</p>
  {:else}
    <p>No day selected</p>
  {/if}
</div>
