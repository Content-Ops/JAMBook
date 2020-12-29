<script>
  import hey from "../../logfile.json";
  import { Calendar } from "@fullcalendar/core";
  import dayGridPlugin from "@fullcalendar/daygrid";
  import { onMount } from "svelte";
  import isSameDay from "date-fns/isSameDay";

  let wordsPerDay = 100;
  let documentTargetLength = 200;

  // let hasWrittenToday = isSameDay(
  //   new Date(2014, 8, 4, 6, 0),
  //   new Date(2014, 8, 4, 18, 0)
  // );

  onMount(() => {
    var calendarEl = document.getElementById("calendar");

    var calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin],
    });

    calendar.render();
  });
</script>

<label>
  <div>Words per day</div>
  <input type="number" bind:value={wordsPerDay} min="0" />
</label>

<label>
  <div>Document target length</div>
  <input type="number" bind:value={documentTargetLength} min="0" />
</label>

<br />
<br />

{#each Object.entries(hey) as [cat_key, cat_val]}
  <div>{cat_key}</div>
  <progress value={cat_val.initialWords} max={documentTargetLength} />
{/each}

<div id="calendar" />
