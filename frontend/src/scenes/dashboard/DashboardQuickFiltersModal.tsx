import { useActions, useValues } from 'kea'
import { actions, kea, key, path, props, reducers, selectors } from 'kea'

import { IconGear } from '@posthog/icons'
import { LemonButton, LemonModal, lemonToast } from '@posthog/lemon-ui'

import { QuickFilterForm } from 'lib/components/QuickFilters/QuickFilterForm'
import { QuickFiltersModalContent } from 'lib/components/QuickFilters/QuickFiltersModalContent'
import { ModalView, quickFiltersModalLogic } from 'lib/components/QuickFilters/quickFiltersModalLogic'

import { QuickFilterContext } from '~/queries/schema/schema-general'
import { DashboardType } from '~/types'

export interface DashboardQuickFiltersSelectionLogicProps {
    dashboard: DashboardType<any>
}

const EMPTY_FILTER_IDS: string[] = []

export const dashboardQuickFiltersSelectionLogic = kea([
    path(['scenes', 'dashboard', 'dashboardQuickFiltersSelectionLogic']),
    props({} as DashboardQuickFiltersSelectionLogicProps),
    key((props) => props.dashboard.id),

    actions({
        toggleDashboardFilter: (filterId: string) => ({ filterId }),
        setSelectedDashboardFilterIds: (filterIds: string[]) => ({ filterIds }),
    }),

    reducers(({ props }) => ({
        selectedDashboardFilterIds: [
            props.dashboard.quick_filter_ids ?? EMPTY_FILTER_IDS,
            {
                toggleDashboardFilter: (state: string[], { filterId }: { filterId: string }) =>
                    state.includes(filterId) ? state.filter((id: string) => id !== filterId) : [...state, filterId],
                setSelectedDashboardFilterIds: (_: string[], { filterIds }: { filterIds: string[] }) => filterIds,
            },
        ],
    })),

    selectors({
        hasDashboardSelectionChanges: [
            (s, p) => [s.selectedDashboardFilterIds, () => p.dashboard.quick_filter_ids ?? EMPTY_FILTER_IDS],
            (selectedIds: string[], dashboardIds: string[]): boolean => {
                if (selectedIds.length !== dashboardIds.length) {
                    return true
                }
                const sortedSelected = [...selectedIds].sort()
                const sortedDashboard = [...dashboardIds].sort()
                return !sortedSelected.every((id, index) => id === sortedDashboard[index])
            },
        ],
    }),
])

interface DashboardQuickFiltersButtonProps {
    context: QuickFilterContext
    dashboard: DashboardType<any>
    updateDashboard: (payload: Partial<DashboardType<any>>) => void
}

export function DashboardQuickFiltersButton({
    context,
    dashboard,
    updateDashboard,
}: DashboardQuickFiltersButtonProps): JSX.Element {
    const selectionLogic = dashboardQuickFiltersSelectionLogic({ dashboard })
    const { selectedDashboardFilterIds, hasDashboardSelectionChanges } = useValues(selectionLogic)
    const { toggleDashboardFilter, setSelectedDashboardFilterIds } = useActions(selectionLogic)

    const handleNewFilterCreated = (filter: { id: string }): void => {
        const currentIds = selectionLogic.values.selectedDashboardFilterIds
        if (!currentIds.includes(filter.id)) {
            const newIds = [...currentIds, filter.id]
            setSelectedDashboardFilterIds(newIds)
            updateDashboard({ quick_filter_ids: newIds })
        }
    }

    const modalLogic = quickFiltersModalLogic({ context, onNewFilterCreated: handleNewFilterCreated })
    const { openModal, closeModal } = useActions(modalLogic)
    const { isModalOpen, view, modalTitle } = useValues(modalLogic)

    const handleSaveSelection = (): void => {
        updateDashboard({ quick_filter_ids: selectedDashboardFilterIds })
        lemonToast.success('Dashboard quick filters updated')
        closeModal()
    }

    return (
        <>
            <LemonButton
                size="small"
                icon={<IconGear />}
                onClick={openModal}
                tooltip="Configure quick filters"
                aria-label="Configure quick filters"
            />
            <LemonModal title={modalTitle} isOpen={isModalOpen} onClose={closeModal} width={800}>
                {view === ModalView.List ? (
                    <QuickFiltersModalContent
                        context={context}
                        selectionColumnConfig={{
                            selectedIds: selectedDashboardFilterIds,
                            onToggleId: toggleDashboardFilter,
                        }}
                        footerActionsConfig={{
                            onSaveSelection: handleSaveSelection,
                            hasChanges: hasDashboardSelectionChanges,
                        }}
                    />
                ) : (
                    <QuickFilterForm context={context} />
                )}
            </LemonModal>
        </>
    )
}
