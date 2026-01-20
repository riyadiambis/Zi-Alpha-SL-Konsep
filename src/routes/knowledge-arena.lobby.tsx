import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/knowledge-arena/lobby')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/knowledge-arena/lobby"!</div>
}
