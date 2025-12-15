'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

type PostListItemProps = {
  slug: string
  href: string
  dateLabel: string
  title: string
}

const API_ROUTE = '/api/post-clicks'

export function PostListItem({ slug, href, dateLabel, title }: PostListItemProps) {
  const [views, setViews] = useState<number | null>(null)

  useEffect(() => {
    let isActive = true
    const controller = new AbortController()

    fetch(`${API_ROUTE}?slug=${encodeURIComponent(slug)}`, {
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (!isActive) return
        setViews(typeof data.count === 'number' ? data.count : 0)
      })
      .catch(() => {
        if (!isActive) return
        setViews(0)
      })

    return () => {
      isActive = false
      controller.abort()
    }
  }, [slug])

  const handleClick = useCallback(() => {
    setViews((prev) => (typeof prev === 'number' ? prev + 1 : prev))

    const payload = JSON.stringify({ slug })
    const sendRequest = () =>
      fetch(API_ROUTE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch((error) => {
        console.error('Failed to record view', error)
      })

    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const success = navigator.sendBeacon(
        API_ROUTE,
        new Blob([payload], { type: 'application/json' })
      )
      if (!success) {
        void sendRequest()
      }
    } else {
      void sendRequest()
    }
  }, [slug])

  return (
    <Link
      href={href}
      className="flex flex-col space-y-1 mb-4 group"
      onClick={handleClick}
    >
      <div className="w-full flex flex-col gap-2 md:flex-row md:items-center">
        <div className="flex flex-col md:flex-row md:items-center gap-2 flex-1 min-w-0">
          <span className="text-gray-600 w-[200px] tabular-nums">{dateLabel}</span>
          <p className="text-gray-900 tracking-tight group-hover:underline flex-1">
            {title}
          </p>
        </div>
        {typeof views === 'number' && (
          <span className="text-sm text-gray-500 text-right">
            {views} view{views === 1 ? '' : 's'}
          </span>
        )}
      </div>
    </Link>
  )
}
