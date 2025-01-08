/* eslint-disable */

const plugin = require('tailwindcss/plugin')

module.exports = {
  mode: 'jit',
  content: [
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  variants: {
    extend: {
      display: ['group-hover'],
    }
  },
  theme: {
    fontFamily: {
      DEFAULT: ['Roboto-Medium', 'sans-serif']
    },
    animationDelay: {
      'none': '0s',
      '75': '75ms',
      '100': '100ms',
      '150': '150ms',
      '200': '200ms',
      '300': '300ms',
      '400': '400ms',
      '500': '500ms',
      '1000': '1000ms',
      '1500': '1500ms',
      '2000': '2000ms',
    },
    extend: {
      // maxHeight: {
      //   '12': '12rem',
      //   '24': '24rem',
      //   '36': '36rem'
      // },
      // minHeight: {
      //   '12': '12rem',
      //   '24': '24rem',
      //   '36': '36rem',
      //   'half': '50%',
      // },
      // minWidth: {
      //   'half': '50%',
      // },
      // width: {
      //   '12': '12rem',
      //   '24': '24rem',
      //   '36': '36rem'
      // },
      // boxShadow: {
      //   'border': 'inset 0 0 0 1px rgb(0 0 0 / 0.05)'
      // },
      colors: {
        'purple': '#D7D4F2',
        'purple-light': '#fbfafd',
        'purple-dark': '#652CB3',
        'green': '#8FD14F',
        'green-dark': '#0CA789',
        'green-light': '#B1DD91',
        'red': '#f94449',
        'red-dark': '#DA0063',
        'red-light': '#FFA7A7',
        'grey': '#E6E6E6',
        'grey-dark': '#808080',
        'grey-light': '#F6F2F2',
        'black': '#3A3A3A',
      },
      animation: {
        'slide-up': 'slideUp 1s forwards',
        'pull-up-in': 'pullUpIn 1s forwards',
        'pull-up-out': 'pullUpOut 4s forwards'
      },
      keyframes: {
        slideUp: {
          '0%': {
            transform: 'translateY(100px)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1'
          }
        },
        pullUpIn: {
          '0%': {
            top: '200vh'
          },
          '100%': {
            top: '0'
          }
        },
        pullUpOut: {
          '0%': {
            top: '0',
            left: '0'
          },
          '25%': {
            top: '-100vh',
            left: '0'
          },
          '50%': {
            top: '-100vh',
            left: '100vw'
          },
          '75%': {
            top: '200vh',
            left: '100vw'
          },
          '100%': {
            top: '200vh',
            left: '0'
          }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    plugin(({ addBase, addComponents, addUtilities, theme, e }) => {
      const values = theme('animationDelay')
      const utilities = Object.entries(values).map(([key, value]) => {
        const className = `animation-delay-${key}`
        return {
          [`.${e(className)}`]: { animationDelay: value }
        }
      })
      addUtilities(utilities)
      addBase({
        // 'h1': { fontSize: '30px' },
        // 'h2': { fontSize: '26px' },
        // 'h3': { fontSize: '22px' },
        // 'h4': { fontSize: '16px' },
        // 'body': { fontSize: '14px', color: '#333', fontFamily: 'Sarabun-Medium, sans-serif' },
        // 'input': {
        //   height: '36px',
        //   fontSize: '14px',
        //   padding: '0 8px',
        //   border: '1px solid #999',
        //   borderRadius: '4px',
        //   outline: 'unset',
        //   '&:focus:not([role=combobox])': {
        //     border: 'unset',
        //     boxShadow: '0 0 4px #808080',
        //   }
        // },
        // 'textarea': {
        //   fontSize: '14px',
        //   borderRadius: '4px',
        //   border: '1px solid #999',
        //   padding: '6px 8px',
        //   outline: 'unset',
        //   '&:focus': {
        //     border: '1px solid #fff',
        //     boxShadow: '0 0 4px #808080',
        //   }
        // },
      })
      addComponents({
        '.btn': {
          minWidth: '80px',
          padding: '5px 20px',
          transition: 'all 0.1s ease-in-out',
          fontWeight: 'bold',
          border: '1px solid',
          borderRadius: '4px',
          cursor: 'pointer',
          textAlign: 'center',
          background: '#fff',
          '&:hover:not(:disabled)': {
            'color': '#FFFFFF'
          },
          '&:disabled': {
            cursor: 'default'
          }
        },
        '.btn-primary': {
          color: '#652CB3',
          borderColor: '#652CB3',
          '&:hover:not(:disabled)': {
            background: '#652CB3'
          },
          '&:disabled': {
            background: '#652CB3',
            color: '#fff',
            filter: 'opacity(0.3)'
          }
        },
        '.btn-success': {
          color: '#0CA789',
          borderColor: '#0CA789',
          '&:hover:not(:disabled)': {
            background: '#0CA789'
          },
          '&:disabled': {
            background: '#0CA789',
            color: '#fff',
            filter: 'opacity(0.3)'
          }
        },
        '.btn-danger': {
          color: '#DA0063',
          borderColor: '#DA0063',
          '&:hover:not(:disabled)': {
            background: '#DA0063'
          },
          '&:disabled': {
            background: '#DA0063',
            color: '#fff',
            filter: 'opacity(0.3)'
          }
        },
        '.ntb-scroll': {
          '&::-webkit-scrollbar': {
            'width': '2px'
          },
          '&::-webkit-scrollbar-track': {
            'background': 'transparent'
          },
          '&::-webkit-scrollbar-thumb': {
            'background': '#FDB5CE',
            'borderRadius': '10px',
            '&:hover': {
              'background': '#FA4786'
            },
            '&:active': {
              'background': '#FB7EAA'
            }
          }
        }
      })
      addUtilities({
        '.hide-scrollbar': {
          msOverflowStyle: 'none', /* Internet Explorer 10+ */
          scrollbarWidth: 'none', /* Firefox */
          overflowY: 'scroll'
        },
        '.hide-scrollbar::-webkit-scrollbar': {
          width: '0px',
          height: '0px'
        }
      })
    })
  ]
}
