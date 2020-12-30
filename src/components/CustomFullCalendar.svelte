<script>
  import { onMount } from 'svelte';
  import FullCalendar from 'svelte-fullcalendar';
  import { selectedDateStr, selectedDate } from '../stores';
  import logfile from '../../logfile.json';

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
    console.log(111, logfile);

    options.events = [
      {
        title: 'X',
        start: '2020-12-15',
        classNames: ['awesome-x'],
      },
      {
        title: 'X',
        start: '2020-12-17',
        classNames: ['awesome-x'],
      },
      {
        title: 'X',
        start: '2020-12-28T22:21:02.041Z',
        allDay: true, // will make the time show
        classNames: ['awesome-x'],
      },
    ];

    options.plugins = [
      (await import('@fullcalendar/daygrid')).default,
      (await import('@fullcalendar/timegrid')).default,
      (await import('@fullcalendar/interaction')).default,
    ];
    options = { ...options };
  });

  function handleDateClick(event) {
    selectedDateStr.set(event.dateStr);
    selectedDate.set(event.date);
  }

  $: console.log(777, $selectedDateStr);

  let fillMe;

  $: Object.entries(logfile).map(([key, value]) => {
    console.log(222, value);
    console.log(333, Object.keys(value));
    console.log(
      444,
      Object.keys(value).find((value) => value.includes($selectedDateStr)),
    );
    let foundTimestamp = Object.keys(value).find((value) =>
      value.includes($selectedDateStr),
    );

    if (foundTimestamp) {
      fillMe = [
        {
          title: 'X',
          start: foundTimestamp,
          allDay: true, // will make the time show
          classNames: ['awesome-x'],
        },
      ];

      options = { ...options, events: fillMe };
    }
  });

  $: console.log(99000, fillMe);
</script>

<FullCalendar bind:this="{calendarComponentRef}" options="{options}" />

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
