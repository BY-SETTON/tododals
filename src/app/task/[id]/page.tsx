"use client"

export default function TaskPage({params}: {
  params: {
    id: string
  }
}) {

  return <div>Task {params.id}</div>
}
