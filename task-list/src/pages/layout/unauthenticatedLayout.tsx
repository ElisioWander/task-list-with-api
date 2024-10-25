import { Outlet } from 'react-router-dom'

import styles from './BaseLayout.module.scss'

export function UnauthenticatedLayout() {
  return (
    <main>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <div className={styles.logoContainer}>
            <svg
              className={styles.logo}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 4.5L6 12L15 19.5"
                stroke="url(#gradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient
                  id="gradient"
                  x1="6"
                  y1="4.5"
                  x2="15"
                  y2="19.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#7C3AED" />
                  <stop offset="1" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.rightSectionContainer}>
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  )
}
