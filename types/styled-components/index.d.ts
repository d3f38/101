import type { Theme as DefaultTheme } from '@app/styles'

import 'styled-components'

declare module 'styled-components' {
  export interface Theme extends DefaultTheme {}
}
