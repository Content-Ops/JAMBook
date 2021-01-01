<script>
  import { onMount } from 'svelte';
  import FullCalendar from 'svelte-fullcalendar';
  import { selectedDateStr, selectedDate } from '../stores';
  import logfile from '../../logfile.json';
  import { wordsPerDay } from '../stores';

  let options = {
    dateClick: handleDateClick,
    editable: false,
    initialView: 'dayGridMonth',
    plugins: [],
    height: 'auto',
    weekends: true,
    eventDisplay: 'background',
  };

  let calendarComponentRef;

  onMount(async () => {
    let eventsWithX = [];

    Object.entries(logfile).map(([_filename, timestampKeys]) => {
      let newestTimestamp = Object.keys(timestampKeys)[
        Object.keys(timestampKeys).length - 1
      ];
      if (timestampKeys[newestTimestamp].currentWords >= $wordsPerDay) {
        eventsWithX = [
          ...eventsWithX,
          {
            title: 'X',
            start: newestTimestamp,
            allDay: true,
            classNames: ['awesome-x'],
          },
        ];
      }
    });

    options.events = eventsWithX;

    options.plugins = [
      (await import('@fullcalendar/daygrid')).default,
      (await import('@fullcalendar/interaction')).default,
    ];
    options = { ...options };
  });

  function handleDateClick(event) {
    selectedDateStr.set(event.dateStr);
    selectedDate.set(event.date.toISOString());
  }
</script>

<div class="card">
  <FullCalendar bind:this="{calendarComponentRef}" options="{options}" />
</div>

<style>
  :global(.awesome-x > .fc-event-title) {
    color: red;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 45px !important;
    margin: 0 !important;
    top: 50%;
  }

  :global(.fc .fc-bg-event) {
    opacity: 1 !important;
  }
</style>
