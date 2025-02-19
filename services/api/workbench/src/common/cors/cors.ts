export function checkAllowedOrigin(origin: string): boolean {
  const allowedOriginPatterns = [
    /^https:\/\/staging\.upwage\.net$/, // Staging API
    /^https:\/\/api\.upwage\.com$/, // Production API
    /^https:\/\/app\.upwage\.com$/, // Production Application
    /^http:\/\/localhost:3000$/, // Local Dev
    /^http:\/\/localhost$/, // Local Dev
    /^https:\/\/staging-map\.upwage\.com$/, // Staging Map
    /^https:\/\/wagemap-frontend\.vercel\.app$/, // Vercel WageMap
    /.*-wagemap-test\.vercel\.app$/, // Partial Vercel WageMap Match
    /^https:\/\/screener-frontend-tau\.vercel\.app$/, // New Screener Production Frontend
    /^https:\/\/screener-frontend-.*-wagemap-test\.vercel\.app$/, // New Screener Frontend with Wildcard
    /^https?:\/\/192\.168\.50\.35$/, // Ryan's Local Dev
    /^https?:\/\/192\.168\.50\.35:3000$/, // Ryan's Local Dev
    /^https:\/\/interview\.upwage\.com$/, // interview.upwage.com
    /^https?:\/\/screener-admin\.vercel\.app$/, // QA Admin
    /^https?:\/\/account\.upwage\.com$/, // Prod Admin 2.0
    /^https?:\/\/account-staging\.upwage\.com$/, // Staging Admin 2.0
    /^https?:\/\/interview-staging\.upwage\.com$/, // Staging Interview
    /^https?:\/\/account-preprod\.upwage\.com$/, // Preprod Admin 2.0
    /^https?:\/\/interview-preprod\.upwage\.com$/, // Preprod Interview
    /^https?:\/\/preprod\.upwage\.org$/, // Preprod
  ];

  return allowedOriginPatterns.some((pattern) => pattern.test(origin));
}
