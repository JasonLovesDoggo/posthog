import { useValues } from 'kea'

import { Link } from '@posthog/lemon-ui'

import { preflightLogic } from 'scenes/PreflightCheck/preflightLogic'

import cloudLogo from 'public/posthog-logo-cloud.svg'
import demoLogo from 'public/posthog-logo-demo.svg'
import defaultLogo from 'public/posthog-logo.svg'
import posthogCodeLogo from 'public/posthog-code-logo.svg'

export function WelcomeLogo({ view }: { view?: string }): JSX.Element {
    const UTM_TAGS = `utm_campaign=in-product&utm_tag=${view || 'welcome'}-header`
    const { preflight } = useValues(preflightLogic)
    const isPostHogCode = preflight?.auth_brand === 'posthog-code'

    const logoSrc = isPostHogCode ? posthogCodeLogo : preflight?.demo ? demoLogo : preflight?.cloud ? cloudLogo : defaultLogo
    const altText = isPostHogCode ? 'PostHog Code' : `PostHog${preflight?.cloud ? ' Cloud' : ''}`
    const logoHref = isPostHogCode ? 'https://posthog.com/code' : `https://posthog.com?${UTM_TAGS}`

    return (
        <Link to={logoHref} className="flex flex-col items-center mb-8">
            <img src={logoSrc} alt={altText} className="h-6" />
        </Link>
    )
}
