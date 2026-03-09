import { useValues } from 'kea'
import type { ReactNode } from 'react'

import { BridgePage } from 'lib/components/BridgePage/BridgePage'
import { preflightLogic } from 'scenes/PreflightCheck/preflightLogic'

import posthogCodeAuthBg from 'public/posthog-code-auth-bg.png'

import { PostHogCodeAuthLeftPanel } from './PostHogCodeAuthLeftPanel'

interface AuthShellProps {
    view: string
    children: ReactNode
    header?: ReactNode
    footer?: ReactNode
    message?: ReactNode
    leftContainerContent?: JSX.Element
    fixedWidth?: boolean
    sideLogo?: boolean
    showHedgehog?: boolean
    hideFooterForPostHogCode?: boolean
}

export function AuthShell({
    view,
    children,
    header,
    footer,
    message,
    leftContainerContent,
    fixedWidth,
    sideLogo,
    showHedgehog,
    hideFooterForPostHogCode,
}: AuthShellProps): JSX.Element {
    const { preflight } = useValues(preflightLogic)
    const isPostHogCode = preflight?.auth_brand === 'posthog-code'

    if (isPostHogCode) {
        return (
            <BridgePage
                view={view}
                noLogo
                theme="posthog-code"
                header={header}
                footer={hideFooterForPostHogCode ? undefined : footer}
                leftContainerContent={<PostHogCodeAuthLeftPanel />}
                fixedWidth={fixedWidth}
                sideLogo={false}
                style={{
                    backgroundImage: `url(${posthogCodeAuthBg})`,
                }}
            >
                {children}
            </BridgePage>
        )
    }

    return showHedgehog ? (
        <BridgePage
            view={view}
            header={header}
            footer={footer}
            leftContainerContent={leftContainerContent}
            fixedWidth={fixedWidth}
            sideLogo={sideLogo}
            hedgehog={true}
            message={message}
        >
            {children}
        </BridgePage>
    ) : (
        <BridgePage
            view={view}
            header={header}
            footer={footer}
            leftContainerContent={leftContainerContent}
            fixedWidth={fixedWidth}
            sideLogo={sideLogo}
        >
            {children}
        </BridgePage>
    )
}
