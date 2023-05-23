// https://vite-plugin-ssr.com/onRenderClient
export default onRenderClient

import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { PageLayout } from './PageLayout'

async function onRenderClient(pageContext) {
  const { Page } = pageContext
  // Fix for creating root more than once on navigation
  window._reactRoot = window._reactRoot || createRoot(document.getElementById('page-view'))
  window._reactRoot.render(
    <PageLayout pageContext={pageContext}>
      <Page />
    </PageLayout>
  )
}
