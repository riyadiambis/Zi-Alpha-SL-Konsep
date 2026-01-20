import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/knowledge-arena/match')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/knowledge-arena/match"!</div>
}
