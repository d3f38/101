import * as React from 'react'

export const HeartsIcon = React.memo((props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="210"
    height="188"
    viewBox="0 0 210 188"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      id="HEARTS"
      d="M150 0C132.26 0 116.79 7.79 105.01 22.59L105 22.6C93.22 7.79 77.74 0 60 0C25.24 0 0 29.01 0 64.32C0 109.09 41.36 136.75 95.12 183.79C97.95 186.27 101.48 187.5 105.01 187.5C108.53 187.5 112.05 186.26 114.88 183.79C168.64 136.74 210 109.08 210 64.32C210 29.01 184.75 0 150 0Z"
      fill="#FF6A4D"
    />
  </svg>
))
