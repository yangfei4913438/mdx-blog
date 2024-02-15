// 自定义距离
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

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx,md,scss}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '2rem',
        md: '2rem',
        lg: '3rem',
        xl: '4rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
    extend: {
      colors: {
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
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      backgroundColor: {
        body: 'var(--background-body)',
        current: 'currentColor',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      textColor: {
        body: 'var(--text-body)',
        'body-dark': 'var(--text-body-dark)',
        secondary: 'var(--text-secondary)',
        current: 'currentColor',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            // 定义markdown内部的渲染样式
            '.markdown-area': {
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
                maxWidth: '100%',
                wordWrap: 'break-word',
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
          },
        },
      }),
      fontSize: {
        sm: '12px',
        normal: '14px',
        md: '18px',
        lg: '22px',
        xl: '26px',
        '2xl': '30px',
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
