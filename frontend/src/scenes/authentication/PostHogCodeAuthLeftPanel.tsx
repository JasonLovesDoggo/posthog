import posthogCodeLogo from 'public/posthog-code-logo.svg'

export function PostHogCodeAuthLeftPanel(): JSX.Element {
    return (
        <div className="max-w-sm">
            <img src={posthogCodeLogo} alt="PostHog Code" className="h-10 mb-6" />
            <h2 className="text-2xl font-semibold leading-tight">the dawn of a new agentic era</h2>
        </div>
    )
}
