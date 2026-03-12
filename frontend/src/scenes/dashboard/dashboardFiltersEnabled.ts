import { useFeatureFlag } from 'lib/hooks/useFeatureFlag'

// AB test metrics (all use existing events, no new instrumentation needed):
//
// Primary metric:
//   Dashboard filter interaction rate — % of 'viewed dashboard' sessions
//   with at least one 'quick filter selected' event
//
// Secondary metrics:
//   - Time-to-first-filter: delta between 'viewed dashboard' and first 'quick filter selected'
//   - Filter changes per session: count of 'quick filter selected' per 'viewed dashboard'
//   - Query efficiency: 'dashboard refreshed' → tiles_refreshed_count and refresh_duration_ms
export function useDashboardFiltersEnabled(): boolean {
    return useFeatureFlag('DASHBOARD_QUICK_FILTERS_EXPERIMENT', 'test')
}
