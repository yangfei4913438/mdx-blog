import type { Config } from 'tailwindcss';

const distance = {
  inherit: 'inherit',
  d2: '2px',
  d3: '3px',
  d4: '4px',
  'screen-10': '10%',
  'screen-20': '20%',
  'screen-30': '30%',
  'screen-40': '40%',
  'screen-50': '50%',
  'screen-60': '60%',
  'screen-70': '70%',
  'screen-80': '80%',
  'screen-90': '90%',
};

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx,scss}'],
  theme: {
    colors: {
      'primary-brighter': 'var(--primary-brighter)',
      'primary-bright': 'var(--primary-bright)',
      primary: 'var(--primary)',
      'primary-dark': 'var(--primary-dark)',
      'primary-darker': 'var(--primary-darker)',
      'primary-opacity-05': 'var(--primary-opacity-05)',
      'primary-opacity-1': 'var(--primary-opacity-1)',
      'primary-opacity-2': 'var(--primary-opacity-2)',
      'primary-opacity-3': 'var(--primary-opacity-3)',
      'primary-opacity-4': 'var(--primary-opacity-4)',
      'primary-opacity-5': 'var(--primary-opacity-5)',
      'primary-opacity-6': 'var(--primary-opacity-6)',
      'primary-opacity-7': 'var(--primary-opacity-7)',
      'primary-opacity-8': 'var(--primary-opacity-8)',
      'primary-opacity-9': 'var(--primary-opacity-9)',
      'primary-divide': 'var(--primary-divide)',
      'success-brighter': 'var(--success-brighter)',
      'success-bright': 'var(--success-bright)',
      success: 'var(--success)',
      'success-dark': 'var(--success-dark)',
      'success-darker': 'var(--success-darker)',
      'success-opacity-1': 'var(--success-opacity-1)',
      'success-opacity-2': 'var(--success-opacity-2)',
      'success-opacity-3': 'var(--success-opacity-3)',
      'success-opacity-4': 'var(--success-opacity-4)',
      'success-opacity-5': 'var(--success-opacity-5)',
      'success-opacity-6': 'var(--success-opacity-6)',
      'success-opacity-7': 'var(--success-opacity-7)',
      'success-opacity-8': 'var(--success-opacity-8)',
      'success-opacity-9': 'var(--success-opacity-9)',
      'success-divide': 'var(--success-divide)',
      'warning-brighter': 'var(--warning-brighter)',
      'warning-bright': 'var(--warning-bright)',
      warning: 'var(--warning)',
      'warning-dark': 'var(--warning-dark)',
      'warning-darker': 'var(--warning-darker)',
      'warning-opacity-1': 'var(--warning-opacity-1)',
      'warning-opacity-2': 'var(--warning-opacity-2)',
      'warning-opacity-3': 'var(--warning-opacity-3)',
      'warning-opacity-4': 'var(--warning-opacity-4)',
      'warning-opacity-5': 'var(--warning-opacity-5)',
      'warning-opacity-6': 'var(--warning-opacity-6)',
      'warning-opacity-7': 'var(--warning-opacity-7)',
      'warning-opacity-8': 'var(--warning-opacity-8)',
      'warning-opacity-9': 'var(--warning-opacity-9)',
      'warning-divide': 'var(--warning-divide)',
      'danger-brighter': 'var(--danger-brighter)',
      'danger-bright': 'var(--danger-bright)',
      danger: 'var(--danger)',
      'danger-dark': 'var(--danger-dark)',
      'danger-darker': 'var(--danger-darker)',
      'danger-opacity-1': 'var(--danger-opacity-1)',
      'danger-opacity-2': 'var(--danger-opacity-2)',
      'danger-opacity-3': 'var(--danger-opacity-3)',
      'danger-opacity-4': 'var(--danger-opacity-4)',
      'danger-opacity-5': 'var(--danger-opacity-5)',
      'danger-opacity-6': 'var(--danger-opacity-6)',
      'danger-opacity-7': 'var(--danger-opacity-7)',
      'danger-opacity-8': 'var(--danger-opacity-8)',
      'danger-opacity-9': 'var(--danger-opacity-9)',
      'danger-divide': 'var(--danger-divide)',
      'info-brighter': 'var(--info-brighter)',
      'info-bright': 'var(--info-bright)',
      info: 'var(--info)',
      'info-dark': 'var(--info-dark)',
      'info-darker': 'var(--info-darker)',
      'info-opacity-1': 'var(--info-opacity-1)',
      'info-opacity-2': 'var(--info-opacity-2)',
      'info-opacity-3': 'var(--info-opacity-3)',
      'info-opacity-4': 'var(--info-opacity-4)',
      'info-opacity-5': 'var(--info-opacity-5)',
      'info-opacity-6': 'var(--info-opacity-6)',
      'info-opacity-7': 'var(--info-opacity-7)',
      'info-opacity-8': 'var(--info-opacity-8)',
      'info-opacity-9': 'var(--info-opacity-9)',

      gray: {
        '05': 'var(--gray-05)',
        1: 'var(--gray-1)',
        2: 'var(--gray-2)',
        3: 'var(--gray-3)',
        4: 'var(--gray-4)',
        5: 'var(--gray-5)',
        6: 'var(--gray-6)',
        7: 'var(--gray-7)',
        8: 'var(--gray-8)',
        9: 'var(--gray-9)',
      },
      transparent: 'transparent',
      black: 'var(--black)',
      white: 'var(--white)',
      'white-opacity': {
        1: 'var(--white-opacity-1)',
        2: 'var(--white-opacity-2)',
        3: 'var(--white-opacity-3)',
        4: 'var(--white-opacity-4)',
        5: 'var(--white-opacity-5)',
        6: 'var(--white-opacity-6)',
        7: 'var(--white-opacity-7)',
        8: 'var(--white-opacity-8)',
        9: 'var(--white-opacity-9)',
      },
      'black-opacity': {
        1: 'var(--black-opacity-1)',
        2: 'var(--black-opacity-2)',
        3: 'var(--black-opacity-3)',
        4: 'var(--black-opacity-4)',
        5: 'var(--black-opacity-5)',
        6: 'var(--black-opacity-6)',
        7: 'var(--black-opacity-7)',
        8: 'var(--black-opacity-8)',
        9: 'var(--black-opacity-9)',
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '2rem',
        md: '2rem',
        lg: '3rem',
        xl: '4rem',
      },
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      typography: (theme: any) => ({
        white: {
          css: {
            h1: {
              color: 'var(--white)',
            },
            h2: {
              color: 'var(--white)',
            },
            h3: {
              color: 'var(--white)',
            },
            h4: {
              color: 'var(--white)',
            },
            p: {
              color: 'var(--white)',
            },
            ul: {
              color: 'var(--white)',
            },
            a: {
              color: 'var(--white)',
              textDecoration: 'none',
            },
          },
        },
        DEFAULT: {
          css: {
            // 定义markdown内部的渲染样式
            '.markdown-area': {
              a: {
                margin: '0 2px',
                borderBottom: '1px solid var(--primary)',
                color: 'var(--primary)',
              },
              ul: {
                li: {
                  fontWeight: 600,
                  '&::before': {
                    background: '#6b7280',
                  },
                },
              },
              pre: {
                margin: 0,
                padding: '1rem',
                background: '#272822',
                code: {
                  margin: 0,
                  padding: 0,
                  color: '#F8F8F2',
                  boxShadow: 'none',
                  background: 'none',
                  width: '100%',
                  whiteSpace: 'pre-wrap',
                  '.function, .attr-name': {
                    color: '#A6E22E',
                  },
                  '.punctuation': {
                    color: 'rgb(23,147,135)',
                  },
                  '.maybe-class-name': {
                    color: '#66D9EF',
                    fontStyle: 'italic',
                  },
                  '.parameter, .attr-value': {
                    color: '#FD971F',
                    fontStyle: 'italic',
                  },
                  '.operator, .tag': {
                    color: '#F92672',
                  },
                  '.null,.nil': {
                    color: '#AE81FF',
                  },
                },
              },
              table: {
                fontSize: '1rem',
                border: '1px solid #e5e7eb',
                thead: {
                  tr: {
                    background: '#f5f5f5',
                    th: {
                      paddingTop: '0.6rem',
                      paddingLeft: '1rem',
                      paddingRight: '1rem',
                      borderRight: '1px solid #e5e7eb',
                    },
                  },
                },
                tbody: {
                  tr: {
                    '&:nth-child(even)': {
                      background: '#f5f5f5',
                    },
                    td: {
                      verticalAlign: 'inherit',
                      paddingLeft: '1rem',
                      paddingRight: '1rem',
                      borderRight: '1px solid #e5e7eb',
                      code: {
                        whiteSpace: 'nowrap',
                      },
                    },
                  },
                },
              },
              blockquote: {
                borderLeft: '4px solid var(--primary-opacity-3)',
                background: 'var(--primary-opacity-1)',
                fontStyle: 'normal',
                fontWeight: 400,
                padding: '1rem',
                p: {
                  margin: 0,
                  '&::before, &::after': {
                    display: 'none',
                  },
                },
                // space-y-2
                '& > * + *': {
                  '--tw-space-y-reverse': 0,
                  paddingTop: 'calc(0.5rem * calc(1 - var(--tw-space-y-reverse)))',
                  paddingBottom: 'calc(0.5rem * var(--tw-space-y-reverse))',
                },
              },
              code: {
                display: 'inline-block',
                backgroundColor: '#e0e0e0',
                color: 'var(--primary)',
                marginLeft: 3,
                marginRight: 3,
                borderRadius: 3,
                padding: '0.05rem 0.35rem',
                letterSpacing: 0.2,
                fontWeight: 500,
                fontStyle: 'normal',
                '--tw-shadow': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                boxShadow:
                  'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)',
                '&::before, &::after': {
                  display: 'none',
                },
              },
            },
            h1: {
              fontFamily: 'DIN-bold',
              textTransform: 'uppercase',
            },
            h2: {
              fontFamily: 'DIN-medium',
            },
            a: {
              //fontWeight: 'normal',
              textDecoration: 'none',
            },
          },
        },
        sm: {
          css: {
            a: {
              fontWeight: 'normal',
            },
          },
        },
        lg: {
          css: {
            h1: {
              textTransform: 'uppercase',
            },
          },
        },
        xl: {
          css: {
            h1: {
              textTransform: 'uppercase',
            },
          },
        },
      }),
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      fontSize: {
        small: '12px',
        normal: '14px',
        large: '18px',
      },
      width: distance,
      minWidth: distance,
      maxWidth: distance,
      height: distance,
      minHeight: distance,
      maxHeight: distance,
      cursor: {
        'zoom-in': 'zoom-in',
        'zoom-out': 'zoom-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography'), require('@tailwindcss/aspect-ratio')],
};
export default config;
