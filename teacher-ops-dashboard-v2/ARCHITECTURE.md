# Teacher Ops Dashboard v2 Architecture

## Project Structure
- `src/components` reusable UI components (Panel, badges, compact controls)
- `src/features` feature modules (clock, timers, bathroom, lesson, notes, utilities, calendar, modes)
- `src/hooks` reusable hooks (`useHotkeys`, persistence helpers)
- `src/lib` shared constants/utilities (bell schedule, date helpers)
- `src/store` centralized state (`types`, `defaultState`, reducer, provider)
- `src/layouts` shell layout primitives for mission-control docking

## Component Hierarchy
- `AppStoreProvider`
  - `Dashboard`
    - `MissionControlLayout`
      - Left rail panels (Clock, Bell Timers, Mode)
      - Center panels (Class+Unit, Lesson Flow, Bathroom)
      - Right rail panels (Quick Timers, Notes, Utilities)

## State Management
- Single reducer-driven store in `src/store/actions.ts`
- Provider in `src/store/AppStore.tsx`
- Persist full state to `localStorage` key: `teacher-ops-v2-state`
- Timer state stores both `endAt` and `pausedRemainingSec` for refresh resilience

## Hotkeys
- `Space` start/pause active timer
- `R` reset active timer
- `T` quick-create timer
- `F` request fullscreen
- `N` focus quick-note input
- `Ctrl+Enter` save quick note
- `Esc` blur current focus

## Persistence Strategy
- Full app snapshot persisted on each reducer state mutation
- Rehydration merges saved state over defaults for forward-compatible migrations
