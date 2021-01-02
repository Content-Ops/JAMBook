<script>
  import FullCalendar from 'svelte-fullcalendar';
  import { selectedDateStr, selectedDate } from '../stores';
  import logfile from '../../logfile.json';
  import { wordsPerDay } from '../stores';
  import { usePrevious } from 'svelte-previous';
  import { mergeDays } from '../helpers';

  let loading = true;

  let options = {
    dateClick: handleDateClick,
    viewDidMount: () => {
      loading = false;
    },
    editable: false,
    initialView: 'dayGridMonth',
    plugins: [],
    height: 'auto',
    weekends: true,
    eventDisplay: 'background',
  };

  let calendarComponentRef;

  const [currentWordsPerDay, previousWordsPerDay] = usePrevious($wordsPerDay);

  const markCalendarDaysWithX = async () => {
    let daysWithDiff = [];

    Object.entries(logfile).map(([_filename, timestampKeys]) => {
      let foundTimestamps = Object.keys(timestampKeys);

      for (let index = 0; index < foundTimestamps.length; index++) {
        // Shorten timestamps to YYYY-MM-DD format so they can be merged into one later
        let shortenedDay = foundTimestamps[index].slice(0, 10);

        daysWithDiff = [
          ...daysWithDiff,
          {
            [shortenedDay]: timestampKeys[foundTimestamps[index]].diff,
          },
        ];
      }
    });

    const eventsWithX = Object.entries(mergeDays(daysWithDiff))
      // Remove dates where words per day goal was not met
      .filter(([_date, totalWordCount]) => {
        return totalWordCount >= $wordsPerDay;
      })
      // Create correct data structure for fullcalendar
      .map(([date, _totalWordCount]) => {
        return {
          title: 'X',
          start: date,
          allDay: true,
          classNames: ['awesome-x'],
        };
      });

    options.events = eventsWithX;
    options.plugins = [
      (await import('@fullcalendar/daygrid')).default,
      (await import('@fullcalendar/interaction')).default,
    ];
    options = { ...options };
  };

  function handleDateClick(event) {
    selectedDateStr.set(event.dateStr);
    selectedDate.set(event.date.toISOString());
  }

  $: $currentWordsPerDay = $wordsPerDay;

  $: if ($currentWordsPerDay !== $previousWordsPerDay) {
    markCalendarDaysWithX();
  }
</script>

<div class="card min-cal-height">
  {#if loading}Loading word count calendar...{/if}

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

  .min-cal-height {
    min-height: 600px;
  }
</style>
