export const themeConfig = {
    colors: {
      background: {
        base: '#030f1c',
        gradient: {
          from: 'rgba(3, 15, 28, 1)',
          to: 'rgba(3, 15, 28, 1)',
          steps: [
            'rgba(3, 15, 28, 1)',
            'rgba(3, 15, 28, 1)',
            'rgba(3, 15, 28, 1)',
            'rgba(3, 15, 28, 1)',
            'rgba(3, 15, 28, 1)',
            'rgba(3, 15, 28, 1)',
            'rgba(3, 15, 28, 1)',
            'rgba(3, 15, 28, 1)',
            'rgba(3, 15, 28, 1)',
            'rgba(3, 15, 28, 1)',
            'rgba(3, 15, 28, 1)',
            'rgba(3, 15, 28, 1)'
          ]
        }
      }
    },
    gradients: {
      splash: {
        primary: {
          size: '100% 100%',
          position: '50% 50%',
          stops: [0, 0, 0]
        },
        secondary: null,
        tertiary: null,
        quaternary: null,
        quinary: null,
        senary: null,
        septenary: null,
        octonary: null
      }
    }
  } as const;