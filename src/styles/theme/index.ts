import breakpoints from './breakpoints'

export const theme = {
  colors: {
    primary: '#5D7D2B',
    white: '#FFFFFF',
    blue: '#1890FF',
    amazing_green: '#41d365',

    red_4: '#FF7875',

    geekblue_1: '#F0F5FF',
    geekblue_4: '#85A5FF',

    green_1: '#F6FFED',
    green_4: '#95DE64',

    gray_2: '#FAFAFA',
    gray_3: '#F5F5F5',
    gray_4: '#F0F0F0',
    gray_6: '#BFBFBF',
    gray_7: '#8C8C8C',
    gray_8: '#595959',
    gray_9: '#262626',
  },

  breakpoints,
}

export type Theme = typeof theme
