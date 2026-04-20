const regularPeriods = [
  {
    label: 'Period 1',
    start: '07:45',
    end: '08:30',
    segments: [
      { start: '07:45', end: '08:00', label: 'First 15 min — NO LEAVING', kind: 'no_bathroom' },
      { start: '08:00', end: '08:15', label: 'RR WINDOW — 15 min max, 2 students per class', kind: 'bathroom_window', bathroom: true },
      { start: '08:15', end: '08:30', label: 'Last 15 min — NO LEAVING', kind: 'no_bathroom' }
    ]
  },
  {
    label: 'Period 2',
    start: '08:35',
    end: '09:20',
    segments: [
      { start: '08:35', end: '08:50', label: 'First 15 min — NO LEAVING', kind: 'no_bathroom' },
      { start: '08:50', end: '09:05', label: 'RR WINDOW — 15 min max, 2 students per class', kind: 'bathroom_window', bathroom: true },
      { start: '09:05', end: '09:20', label: 'Last 15 min — NO LEAVING', kind: 'no_bathroom' }
    ]
  },
  {
    label: 'Period 3',
    start: '09:25',
    end: '10:10',
    segments: [
      { start: '09:25', end: '09:40', label: 'First 15 min — NO LEAVING', kind: 'no_bathroom' },
      { start: '09:40', end: '09:55', label: 'RR WINDOW — 15 min max, 2 students per class', kind: 'bathroom_window', bathroom: true },
      { start: '09:55', end: '10:10', label: 'Last 15 min — NO LEAVING', kind: 'no_bathroom' }
    ]
  },
  { label: 'Period 4', start: '10:15', end: '11:50', segments: [] },
  {
    label: 'Period 5',
    start: '11:55',
    end: '12:40',
    segments: [
      { start: '11:55', end: '12:10', label: 'First 15 min — NO LEAVING', kind: 'no_bathroom' },
      { start: '12:10', end: '12:25', label: 'RR WINDOW — 15 min max, 2 students per class', kind: 'bathroom_window', bathroom: true },
      { start: '12:25', end: '12:40', label: 'Last 15 min — NO LEAVING', kind: 'no_bathroom' }
    ]
  },
  {
    label: 'Period 6',
    start: '12:45',
    end: '13:30',
    segments: [
      { start: '12:45', end: '13:00', label: 'First 15 min — NO LEAVING', kind: 'no_bathroom' },
      { start: '13:00', end: '13:15', label: 'RR WINDOW — 15 min max, 2 students per class', kind: 'bathroom_window', bathroom: true },
      { start: '13:15', end: '13:30', label: 'Last 15 min — NO LEAVING', kind: 'no_bathroom' }
    ]
  },
  {
    label: 'Period 7',
    start: '13:35',
    end: '14:20',
    segments: [
      { start: '13:35', end: '13:50', label: 'First 15 min — NO LEAVING', kind: 'no_bathroom' },
      { start: '13:50', end: '14:05', label: 'RR WINDOW — 15 min max, 2 students at a time', kind: 'bathroom_window', bathroom: true },
      { start: '14:05', end: '14:20', label: 'Last 15 min — NO LEAVING', kind: 'no_bathroom' }
    ]
  }
];

const period4Tracks = {
  A: [
    { start: '10:15', end: '10:40', label: 'A Lunch', kind: 'lunch' },
    { start: '10:45', end: '11:30', label: 'Period 4 Class (A Lunch Track)', kind: 'class' }
  ],
  B: [
    { start: '10:15', end: '10:45', label: 'Period 4 Class (B Lunch Track)', kind: 'class' },
    { start: '10:45', end: '11:15', label: 'B Lunch', kind: 'lunch' },
    { start: '11:20', end: '11:35', label: 'Period 4 Class (B Lunch Track)', kind: 'class' }
  ],
  C: [
    { start: '10:15', end: '11:00', label: 'Period 4 Class (C Lunch Track)', kind: 'class' },
    { start: '11:20', end: '11:50', label: 'C Lunch', kind: 'lunch' }
  ]
};

const delaySchedule = [
  { label: 'Period 1', start: '09:45', end: '10:10', segments: [{ start: '09:45', end: '10:10', label: 'Class Block', kind: 'class' }] },
  { label: 'Period 4', start: '10:15', end: '11:50', segments: [{ start: '10:15', end: '11:50', label: 'Class / Lunch Rotation Block', kind: 'class' }] },
  { label: 'Period 2', start: '11:55', end: '12:20', segments: [{ start: '11:55', end: '12:20', label: 'Class Block', kind: 'class' }] },
  { label: 'Period 3', start: '12:25', end: '12:50', segments: [{ start: '12:25', end: '12:50', label: 'Class Block', kind: 'class' }] },
  { label: 'Period 5', start: '12:55', end: '13:20', segments: [{ start: '12:55', end: '13:20', label: 'Class Block', kind: 'class' }] },
  { label: 'Period 6', start: '13:25', end: '13:50', segments: [{ start: '13:25', end: '13:50', label: 'Class Block', kind: 'class' }] },
  { label: 'Period 7', start: '13:55', end: '14:20', segments: [{ start: '13:55', end: '14:20', label: 'Class Block', kind: 'class' }] }
];

const scheduleContainer = document.getElementById('schedule');
const modeSelect = document.getElementById('scheduleMode');
const trackSelect = document.getElementById('period4Track');
const planningPeriodSelect = document.getElementById('planningPeriod');
const clockEl = document.getElementById('liveClock');
const dateEl = document.getElementById('todayDate');
const statusEl = document.getElementById('nowStatus');
const scheduleTimerEl = document.getElementById('scheduleTimer');
const lofiToggleButton = document.getElementById('lofiToggle');
const lofiStatusEl = document.getElementById('lofiStatus');
const timerDurationSelect = document.getElementById('timerDuration');
const timerStartButton = document.getElementById('timerStart');
const timerResetButton = document.getElementById('timerReset');
const timerDisplayEl = document.getElementById('timerDisplay');
const timerStatusEl = document.getElementById('timerStatus');
const workspaceGridEl = document.getElementById('workspaceGrid');
const viewDashboardBtn = document.getElementById('viewDashboard');
const viewBathroomBtn = document.getElementById('viewBathroom');
const viewSplitBtn = document.getElementById('viewSplit');
const pickerTeacherIdInput = document.getElementById('pickerTeacherId');
const pickerPeriodSelect = document.getElementById('pickerPeriod');
const syncCurrentPeriodBtn = document.getElementById('syncCurrentPeriod');
const pickStudentBtn = document.getElementById('pickStudent');
const pickerResultEl = document.getElementById('pickerResult');
const pickerMetaEl = document.getElementById('pickerMeta');

const defaultRosters = {
  'Period 1': ['Beason, Kyrell', 'Blevins, Faith', 'Bringham, Nathaniel', 'Buckner, Bevyn', 'Carson, Cash', 'Cruz Lemus, Katya', 'Damian, Miguel', 'Dansby, Sean', 'Fountain, Akeelah', 'Guadalupe Flores, Alexis', 'Hatton, Cayden', 'Haymer, Ki\'Avoni', 'Hightower, Austin', 'Jordan, Mariah', 'LaMaster, Mason', 'Morales, Landon', 'PadillaThornton, Zachariah', 'Palemon, Luis', 'Patrick, Micah', 'Richardson, Steven', 'Riddlespriger, Marley', 'Santana, Jason', 'Segebart, Chasity', 'Sharpnack, Alissa', 'Vowell, Layla'],
  'Period 2': ['Booker, Milana', 'Burnell, Logan', 'Chavez Morales, Alfredo', 'Durbin, Blake', 'Fountain, Isaac', 'Garner, Marquel', 'Hargett, Easton', 'Haskins, Caelan', 'Hernandez, Myshielis', 'Holman, Chase', 'Lewis, Ava', 'Magallon, Heily', 'Miller, Bryson', 'Napier, Braylen', 'Pasley, Elijah', 'Rojas, Jovanny', 'Santillan, Emiliano', 'Shircliff, Madelyn', 'Stephens, Rowaan', 'Williams, Anjalese', 'Wilson, Tristin'],
  'Period 3': ['Alokoa, Kobesasi-Ismael', 'Alvarenga, Haylee', 'Asare, Kingsley', 'Beckam, Jackson', 'Early, Samson', 'Escobar, Jacqueline', 'Liles, Aminah', 'Linthicome, Deontae', 'Miller, Christian', 'Pulliam, Kenzie', 'Reed, Terrain', 'Rubio, Adair', 'Sparkman, Noah', 'Wilson, Ty\'Tianna', 'Bobo, Luke', 'Brown, Brandon', 'Buckner, Stephen', 'Conner, Kingston', 'Fountain, Elijah', 'Fulkerson, Melody', 'Greenwade, Jeremiah', 'Ortiz, Christopher', 'Parker, Raina', 'Payne, Jaden', 'Rozier, Michael', 'Schilling, Kenshawn'],
  'Period 5': ['Blevins, Miah', 'Campos Juarez, Brandon', 'Dunn, Ari\'hya', 'Gonzalez Rojas, Misael', 'Greene, Shane', 'Hernandez Suarez, Santiago', 'Hicks, Makenzie', 'Jimenez Hidalgo, Camila', 'Johnson, Tyren', 'Jordan, Amiyah', 'Middleton, Arayiah', 'Moore, Ayedenn', 'Newson, Justice', 'Ricketts, Aiden', 'Rosas, Rhianna', 'Smith, Ja\'Rayah', 'Wagner, Aaliyah', 'Washington, Kori', 'Wright, Dyamon', 'Alvarado, Kayleen', 'Baker, Jeremy', 'Bratcher, Isaiah', 'Claros Ramos, Loany', 'Crosby, Kobe', 'Eldridge, Madison', 'Forrest, Jackson', 'Gaytan, Alistair', 'Gleitz, Christian', 'Harper, Kaylee', 'Hatcher-Daniel, Jae\'shaun', 'Martin, Kaniel', 'Misic, Aiden', 'Smith, Ariana', 'Smith, Spencer', 'Wickliffe, Tytionna'],
  'Period 6': ['Amos, Skylan', 'Anderson, Alyssa', 'Baggett, Yorel', 'Brown, Autumn', 'Brown, Sariya', 'Coates, Andrew', 'Cross, Yanaija', 'Dunn, Samuel', 'Kannamore-Carter, Ra\'janae', 'Maniloff, Georgia', 'Marshall, Maya', 'Medrano, Lygaci', 'Moorman, Dionna', 'Nash, Mekhi', 'Parham, Symphony', 'Pena, Daylin', 'Shelton, Arion', 'Thomas, Ja\'Miracle', 'Thompson, Lorenzo'],
  'Period 7': ['Alvarez Madrid, Luis', 'Bailey, Breanna', 'Benn, Mya', 'Britto, Emery', 'Cannon, Evan', 'Copas, Stephanie', 'Culver, Chase', 'Delgado, Isaac', 'Eppler, Robert', 'Gary, Nevaeh', 'Gruver, Michael', 'Hinkle, Aria', 'Jones, Chloe', 'Jones-Turner, Reno', 'Pena Canseco, Jose', 'Ross, Baylee', 'Santana, Jeiran', 'Santos, Edgar', 'Young, Braylen', 'Black, Arianna', 'Brown, Riyhlen', 'Conde, Eli', 'Ellery, Detrick', 'Finch, Brycen', 'Humphreys, Rylan', 'Mills, Andrew', 'Piccuito, Hannah', 'Spaulding, Easton', 'Vazquez, Fidel']
};

let audioContext;
let lofiMasterGain;
let lofiIntervalId;
let lofiIsOn = false;
let timerIntervalId;
let timerEndTimestamp;
let remainingSeconds = 180;
let timerIsRunning = false;
let rosterData = defaultRosters;
let rosterSource = 'default dashboard roster';

initializeScheduleSettings();
initializeWorkspaceView();
refreshRosterData();
setPickerToCurrentPeriod();
renderPickerPeriods();

function toMinutes(hhmm) {
  const [hours, minutes] = hhmm.split(':').map(Number);
  return (hours * 60) + minutes;
}

function formatTime(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  const hour12 = ((h + 11) % 12) + 1;
  const ampm = h >= 12 ? 'PM' : 'AM';
  return `${hour12}:${String(m).padStart(2, '0')} ${ampm}`;
}

function currentMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

function toSeconds(hhmm) {
  return toMinutes(hhmm) * 60;
}

function currentSeconds() {
  const now = new Date();
  return (now.getHours() * 3600) + (now.getMinutes() * 60) + now.getSeconds();
}

function formatCountdown(totalSeconds) {
  const safeSeconds = Math.max(0, totalSeconds);
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;

  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function buildRegularSchedule() {
  const selectedPlanning = planningPeriodSelect.value;

  return regularPeriods.map((period) => {
    if (period.label === selectedPlanning) {
      return {
        ...period,
        segments: [
          {
            start: period.start,
            end: period.end,
            label: 'My Planning',
            kind: 'planning'
          }
        ]
      };
    }

    if (period.label !== 'Period 4') return period;
    return { ...period, segments: period4Tracks[trackSelect.value] };
  });
}

function activeSchedule() {
  return modeSelect.value === 'delay' ? delaySchedule : buildRegularSchedule();
}

function getCurrentPeriod(periods) {
  const now = currentMinutes();
  return periods.findIndex((period) => now >= toMinutes(period.start) && now < toMinutes(period.end));
}

function getCurrentSegment(period) {
  const now = currentMinutes();
  return period.segments.find((segment) => now >= toMinutes(segment.start) && now < toMinutes(segment.end));
}

function bathroomOpen(segment) {
  return Boolean(segment?.bathroom);
}

function renderSchedule() {
  const periods = activeSchedule();
  const currentPeriodIndex = getCurrentPeriod(periods);
  scheduleContainer.innerHTML = '';

  periods.forEach((period, index) => {
    const card = document.createElement('article');
    card.className = 'block';
    if (index === currentPeriodIndex) card.classList.add('current');
    if (index < currentPeriodIndex) card.classList.add('past');

    const segment = index === currentPeriodIndex ? getCurrentSegment(period) : null;
    const showBathroom = bathroomOpen(segment);

    const segmentsMarkup = period.segments.map((part) => {
      const isCurrentPart = segment && segment.start === part.start && segment.end === part.end;
      return `
        <li class="segment ${isCurrentPart ? 'segment-current' : ''} kind-${part.kind}">
          <span>${formatTime(part.start)} - ${formatTime(part.end)}</span>
          <span>${part.label}</span>
        </li>
      `;
    }).join('');

    card.innerHTML = `
      <div class="block-head">
        <p class="time">${formatTime(period.start)} - ${formatTime(period.end)}</p>
        <span class="pill">${period.label}</span>
      </div>
      <ul class="segments">${segmentsMarkup}</ul>
      <div class="bathroom-window ${showBathroom ? 'open' : ''}">
        <p><strong>Bathroom window OPEN:</strong> 15 min max • 2 students at a time.</p>
      </div>
    `;

    scheduleContainer.appendChild(card);
  });

  updateStatus(periods, currentPeriodIndex);
  updateScheduleTimer(periods, currentPeriodIndex);
}

function updateStatus(periods, currentPeriodIndex) {
  const now = currentMinutes();
  if (currentPeriodIndex < 0) {
    const first = periods[0];
    const last = periods[periods.length - 1];
    if (now < toMinutes(first.start)) {
      statusEl.textContent = `Before school day (${formatTime(first.start)} start).`;
    } else {
      statusEl.textContent = `After school day (${formatTime(last.end)} end).`;
    }
    return;
  }

  const period = periods[currentPeriodIndex];
  const segment = getCurrentSegment(period);
  statusEl.textContent = segment
    ? `Now: ${period.label} — ${segment.label}`
    : `Now: ${period.label}`;
}


function updateScheduleTimer(periods, currentPeriodIndex) {
  if (!scheduleTimerEl) return;

  const nowSeconds = currentSeconds();

  if (currentPeriodIndex < 0) {
    const firstPeriod = periods[0];
    const schoolStart = toSeconds(firstPeriod.start);

    if (nowSeconds < schoolStart) {
      const secondsUntilStart = schoolStart - nowSeconds;
      scheduleTimerEl.textContent = `Starts in ${formatCountdown(secondsUntilStart)} (${formatTime(firstPeriod.start)}).`;
    } else {
      scheduleTimerEl.textContent = 'School day has ended.';
    }
    return;
  }

  const currentPeriod = periods[currentPeriodIndex];
  const currentSegment = getCurrentSegment(currentPeriod);

  if (currentSegment) {
    const segmentEnd = toSeconds(currentSegment.end);
    const secondsLeftInSegment = segmentEnd - nowSeconds;
    scheduleTimerEl.textContent = `${currentSegment.label} ends in ${formatCountdown(secondsLeftInSegment)}.`;
    return;
  }

  const periodEnd = toSeconds(currentPeriod.end);
  const secondsLeftInPeriod = periodEnd - nowSeconds;
  scheduleTimerEl.textContent = `${currentPeriod.label} ends in ${formatCountdown(secondsLeftInPeriod)}.`;
}

function updateClock() {
  const now = new Date();
  clockEl.textContent = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', second: '2-digit' });
  dateEl.textContent = now.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
}

function setWorkspaceMode(mode) {
  workspaceGridEl.classList.remove('mode-dashboard', 'mode-bathroom', 'mode-split');
  workspaceGridEl.classList.add(`mode-${mode}`);
  viewDashboardBtn.classList.toggle('active', mode === 'dashboard');
  viewBathroomBtn.classList.toggle('active', mode === 'bathroom');
  viewSplitBtn.classList.toggle('active', mode === 'split');
  localStorage.setItem('teachingDashboardWorkspaceMode', mode);
}

function initializeWorkspaceView() {
  const savedMode = localStorage.getItem('teachingDashboardWorkspaceMode');
  if (savedMode && ['dashboard', 'bathroom', 'split'].includes(savedMode)) {
    setWorkspaceMode(savedMode);
  } else {
    setWorkspaceMode('dashboard');
  }
}

function refreshRosterData() {
  const teacherId = (pickerTeacherIdInput.value || '').trim() || 'mr-bramer';
  const key = `bathroom-break-config-${teacherId}`;
  const savedConfig = localStorage.getItem(key);
  if (savedConfig) {
    try {
      const parsedConfig = JSON.parse(savedConfig);
      if (parsedConfig?.rosters && typeof parsedConfig.rosters === 'object') {
        rosterData = parsedConfig.rosters;
        rosterSource = `teacher config (${teacherId})`;
      }
    } catch {
      rosterData = defaultRosters;
      rosterSource = 'default dashboard roster';
    }
  } else {
    rosterData = defaultRosters;
    rosterSource = 'default dashboard roster';
  }
  renderPickerPeriods();
}

function currentPeriodLabel() {
  const periods = activeSchedule();
  const currentPeriodIndex = getCurrentPeriod(periods);
  if (currentPeriodIndex < 0) return '';
  return periods[currentPeriodIndex].label;
}

function renderPickerPeriods() {
  const periodNames = Object.keys(rosterData);
  const selected = pickerPeriodSelect.value;
  pickerPeriodSelect.innerHTML = periodNames.map((period) => `<option value="${period}">${period}</option>`).join('');
  if (periodNames.includes(selected)) {
    pickerPeriodSelect.value = selected;
  }
  pickerMetaEl.textContent = `Roster source: ${rosterSource}.`;
}

function setPickerToCurrentPeriod() {
  const label = currentPeriodLabel();
  if (label && [...pickerPeriodSelect.options].some((option) => option.value === label)) {
    pickerPeriodSelect.value = label;
    pickerResultEl.textContent = `Period synced to ${label}.`;
  } else {
    pickerResultEl.textContent = 'Current period has no roster loaded. Choose a period manually.';
  }
}

function pickRandomStudent() {
  const period = pickerPeriodSelect.value;
  const students = rosterData[period] || [];
  if (!students.length) {
    pickerResultEl.textContent = `No students found for ${period}.`;
    return;
  }
  const randomIndex = Math.floor(Math.random() * students.length);
  const student = students[randomIndex];
  pickerResultEl.textContent = `🎯 ${student} (${period})`;
  pickerMetaEl.textContent = `Roster source: ${rosterSource} • ${students.length} students in ${period}.`;
}

function initializeScheduleSettings() {
  const savedMode = localStorage.getItem('teachingDashboardDayType');
  const savedTrack = localStorage.getItem('teachingDashboardPeriod4Track');
  const savedPlanning = localStorage.getItem('teachingDashboardPlanningPeriod');

  if (savedMode && [...modeSelect.options].some((option) => option.value === savedMode)) {
    modeSelect.value = savedMode;
  }
  if (savedTrack && [...trackSelect.options].some((option) => option.value === savedTrack)) {
    trackSelect.value = savedTrack;
  }
  if (savedPlanning && [...planningPeriodSelect.options].some((option) => option.value === savedPlanning)) {
    planningPeriodSelect.value = savedPlanning;
  }
}

function saveScheduleSettings() {
  localStorage.setItem('teachingDashboardDayType', modeSelect.value);
  localStorage.setItem('teachingDashboardPeriod4Track', trackSelect.value);
  localStorage.setItem('teachingDashboardPlanningPeriod', planningPeriodSelect.value);
}

function ensureAudioContext() {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
}

function scheduleLofiBar(startAt) {
  const chords = [
    [220, 261.63, 329.63],
    [196, 246.94, 329.63],
    [174.61, 220, 293.66],
    [196, 233.08, 293.66]
  ];
  let cursor = startAt;
  chords.forEach((chord) => {
    chord.forEach((freq) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const wobble = audioContext.createOscillator();
      const wobbleGain = audioContext.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, cursor);

      wobble.type = 'sine';
      wobble.frequency.setValueAtTime(1.7, cursor);
      wobbleGain.gain.setValueAtTime(0.7, cursor);
      wobble.connect(wobbleGain);
      wobbleGain.connect(osc.frequency);

      gain.gain.setValueAtTime(0.0001, cursor);
      gain.gain.exponentialRampToValueAtTime(0.06, cursor + 0.35);
      gain.gain.exponentialRampToValueAtTime(0.04, cursor + 3.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, cursor + 4);

      osc.connect(gain);
      gain.connect(lofiMasterGain);
      osc.start(cursor);
      wobble.start(cursor);
      osc.stop(cursor + 4);
      wobble.stop(cursor + 4);
    });

    const hiss = audioContext.createBufferSource();
    const hissGain = audioContext.createGain();
    const length = audioContext.sampleRate * 4;
    const noiseBuffer = audioContext.createBuffer(1, length, audioContext.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * 0.03;
    }
    hiss.buffer = noiseBuffer;
    hissGain.gain.value = 0.12;
    hiss.connect(hissGain);
    hissGain.connect(lofiMasterGain);
    hiss.start(cursor);
    hiss.stop(cursor + 4);

    cursor += 4;
  });
}

function startLofi() {
  ensureAudioContext();
  if (!lofiMasterGain) {
    lofiMasterGain = audioContext.createGain();
    lofiMasterGain.gain.value = 0.22;
    lofiMasterGain.connect(audioContext.destination);
  }
  if (lofiIsOn) return;
  lofiIsOn = true;
  const now = audioContext.currentTime + 0.05;
  scheduleLofiBar(now);
  lofiIntervalId = setInterval(() => {
    scheduleLofiBar(audioContext.currentTime + 0.08);
  }, 16000);
  lofiToggleButton.textContent = 'Turn lofi off';
  lofiStatusEl.textContent = 'Lofi is on.';
}

function stopLofi() {
  if (!lofiIsOn) return;
  lofiIsOn = false;
  clearInterval(lofiIntervalId);
  lofiIntervalId = null;
  if (lofiMasterGain && audioContext) {
    lofiMasterGain.gain.cancelScheduledValues(audioContext.currentTime);
    lofiMasterGain.gain.setTargetAtTime(0.0001, audioContext.currentTime, 0.08);
  }
  lofiToggleButton.textContent = 'Turn lofi on';
  lofiStatusEl.textContent = 'Lofi is off.';
}

function formatTimerDisplay(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function playTimerDoneSound() {
  ensureAudioContext();
  const notes = [523.25, 659.25, 783.99];
  notes.forEach((freq, index) => {
    const start = audioContext.currentTime + (index * 0.18);
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.35, start + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.25);
    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.start(start);
    osc.stop(start + 0.28);
  });
}

function syncTimerDisplay() {
  timerDisplayEl.textContent = formatTimerDisplay(remainingSeconds);
}

function startTimer() {
  if (timerIsRunning) return;
  const selectedMinutes = Number(timerDurationSelect.value) || 3;
  if (remainingSeconds <= 0 || remainingSeconds !== selectedMinutes * 60) {
    remainingSeconds = selectedMinutes * 60;
  }

  timerIsRunning = true;
  timerEndTimestamp = Date.now() + (remainingSeconds * 1000);
  timerStartButton.textContent = 'Running...';
  timerStatusEl.textContent = `Timer running for ${Math.ceil(remainingSeconds / 60)} minute(s).`;

  timerIntervalId = setInterval(() => {
    const msLeft = timerEndTimestamp - Date.now();
    remainingSeconds = Math.max(0, Math.ceil(msLeft / 1000));
    syncTimerDisplay();
    if (remainingSeconds <= 0) {
      clearInterval(timerIntervalId);
      timerIsRunning = false;
      timerStartButton.textContent = 'Start';
      timerStatusEl.textContent = 'Time is up!';
      playTimerDoneSound();
    }
  }, 250);
}

function resetTimer() {
  clearInterval(timerIntervalId);
  timerIntervalId = null;
  timerIsRunning = false;
  remainingSeconds = (Number(timerDurationSelect.value) || 3) * 60;
  timerStartButton.textContent = 'Start';
  timerStatusEl.textContent = 'Ready to start.';
  syncTimerDisplay();
}

modeSelect.addEventListener('change', () => {
  saveScheduleSettings();
  renderSchedule();
});
trackSelect.addEventListener('change', () => {
  saveScheduleSettings();
  renderSchedule();
});
planningPeriodSelect.addEventListener('change', () => {
  saveScheduleSettings();
  renderSchedule();
});
lofiToggleButton.addEventListener('click', () => {
  if (lofiIsOn) {
    stopLofi();
  } else {
    startLofi();
  }
});
timerStartButton.addEventListener('click', startTimer);
timerResetButton.addEventListener('click', resetTimer);
timerDurationSelect.addEventListener('change', () => {
  if (!timerIsRunning) {
    remainingSeconds = Number(timerDurationSelect.value) * 60;
    syncTimerDisplay();
  }
});
viewDashboardBtn.addEventListener('click', () => setWorkspaceMode('dashboard'));
viewBathroomBtn.addEventListener('click', () => setWorkspaceMode('bathroom'));
viewSplitBtn.addEventListener('click', () => setWorkspaceMode('split'));
pickerTeacherIdInput.addEventListener('change', () => {
  refreshRosterData();
  setPickerToCurrentPeriod();
});
syncCurrentPeriodBtn.addEventListener('click', setPickerToCurrentPeriod);
pickStudentBtn.addEventListener('click', pickRandomStudent);

updateClock();
renderSchedule();
syncTimerDisplay();
setInterval(() => {
  updateClock();
  renderSchedule();
}, 1000);
