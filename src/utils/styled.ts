import { css } from 'styled-components'

import { Theme } from '@app/styles'

export const themeSelect = <T extends string | number | {}>(
  selector: (theme: Theme) => T | keyof Theme
) => <P extends { theme: Theme }>({ theme }: P) => {
  const res = typeof selector === 'string' ? theme[selector] : selector(theme)

  return typeof res === 'object' ? css({ ...(res as object) }) : res
}

export const media = {
  up: (key: Parameters<Theme['breakpoints']['up']>[0]) => <
    P extends { theme: Theme }
  >({
    theme,
  }: P) => theme.breakpoints.up(key),
  down: (key: Parameters<Theme['breakpoints']['down']>[0]) => <
    P extends { theme: Theme }
  >({
    theme,
  }: P) => theme.breakpoints.down(key),
  only: (key: Parameters<Theme['breakpoints']['only']>[0]) => <
    P extends { theme: Theme }
  >({
    theme,
  }: P) => theme.breakpoints.only(key),
  between: (
    start: Parameters<Theme['breakpoints']['between']>[0],
    end: Parameters<Theme['breakpoints']['between']>[1]
  ) => <P extends { theme: Theme }>({ theme }: P) =>
    theme.breakpoints.between(start, end),
} as const
