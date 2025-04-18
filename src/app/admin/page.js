import React from 'react'
import Link from 'next/link'
export default function page() {
  return (
    <div>

      <Link href="/admin/courses/">Courses</Link>
      <Link href="/admin/topics/">Topics</Link>
      <Link href="/admin/users/">Users</Link>
    </div>
  )
}
