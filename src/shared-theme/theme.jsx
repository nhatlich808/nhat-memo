import { createTheme, alpha } from '@mui/material/styles'

const defaultTheme = createTheme()

export const brand = {
  50: 'hsl(210, 100%, 95%)',
  100: 'hsl(210, 100%, 92%)',
  200: 'hsl(210, 100%, 80%)',
  300: 'hsl(210, 100%, 65%)',
  400: 'hsl(210, 98%, 48%)',
  500: 'hsl(210, 98%, 42%)',
  600: 'hsl(210, 98%, 55%)',
  700: 'hsl(210, 100%, 35%)',
  800: 'hsl(210, 100%, 16%)',
  900: 'hsl(210, 100%, 21%)',
};

export const gray = {
  50: 'hsl(220, 35%, 97%)',
  100: 'hsl(220, 30%, 94%)',
  200: 'hsl(220, 20%, 88%)',
  300: 'hsl(220, 20%, 80%)',
  400: 'hsl(220, 20%, 65%)',
  500: 'hsl(220, 20%, 42%)',
  600: 'hsl(220, 20%, 35%)',
  700: 'hsl(220, 20%, 25%)',
  800: 'hsl(220, 30%, 6%)',
  900: 'hsl(220, 35%, 3%)',
};

export const green = {
  50: 'hsl(120, 80%, 98%)',
  100: 'hsl(120, 75%, 94%)',
  200: 'hsl(120, 75%, 87%)',
  300: 'hsl(120, 61%, 77%)',
  400: 'hsl(120, 44%, 53%)',
  500: 'hsl(120, 59%, 30%)',
  600: 'hsl(120, 70%, 25%)',
  700: 'hsl(120, 75%, 16%)',
  800: 'hsl(120, 84%, 10%)',
  900: 'hsl(120, 87%, 6%)',
};

export const orange = {
  50: 'hsl(45, 100%, 97%)',
  100: 'hsl(45, 92%, 90%)',
  200: 'hsl(45, 94%, 80%)',
  300: 'hsl(45, 90%, 65%)',
  400: 'hsl(45, 90%, 40%)',
  500: 'hsl(45, 90%, 35%)',
  600: 'hsl(45, 91%, 25%)',
  700: 'hsl(45, 94%, 20%)',
  800: 'hsl(45, 95%, 16%)',
  900: 'hsl(45, 93%, 12%)',
};

export const red = {
  50: 'hsl(0, 100%, 97%)',
  100: 'hsl(0, 92%, 90%)',
  200: 'hsl(0, 94%, 80%)',
  300: 'hsl(0, 90%, 65%)',
  400: 'hsl(0, 90%, 40%)',
  500: 'hsl(0, 90%, 30%)',
  600: 'hsl(0, 91%, 25%)',
  700: 'hsl(0, 94%, 18%)',
  800: 'hsl(0, 95%, 12%)',
  900: 'hsl(0, 93%, 6%)',
};

export const colorSchemes = {
    light: {
        palette: {
            primary: {
                light: brand[200],
                main: brand[300],
                dark: brand[700],
                contrastText: brand[50],
            },
            info: {
                light: brand[100],
                main: brand[200],
                dark: brand[600],
                contrastText: brand[50],
            },
            grey: {
                ...gray
            },
            divider: alpha(gray[300], 0.4),
            background: {
                default: 'hsl(0, 0%, 99%)',
                paper: 'hsl(220, 40%, 97%)',
            },
            text: {
                primary: gray[800],
                secondary: gray[600],
                warning: gray[400],
            },
            action: {
                hover: alpha(gray[200], 0.4),
                selected: `${alpha(gray[200], 0.3)}`,
            },
            baseShadow: 'hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px',
        } 
    },
    dark: {
        palette: {
            primary: {
                light: brand[200],
                main: brand[300],
                dark: brand[700],
                contrastText: brand[50],
            },
            info: {
                light: brand[500],
                main: brand[600],
                dark: brand[700],
                contrastText: brand[300],
            },
            grey: {
                ...gray
            },
            divider: alpha(gray[600], 0.6),
            background: {
                default: gray[700],
                paper: 'hsl(220, 30%, 27%)',
            },
            text: {
                primary: 'hsl(0, 0%, 100%)',
                secondary: gray[400],
            },
            action: {
                hover: alpha(gray[600], 0.2),
                selected: `${alpha(gray[600], 0.3)}`,
            },
            baseShadow: 'hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px',
        }
    }
};

export const typography = {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
        fontSize: defaultTheme.typography.pxToRem(48),
        fontWeight: 600,
        lineHeight: 1.2,
    },
    h2: {
        fontSize: defaultTheme.typography.pxToRem(36),
        fontWeight: 600,
        lineHeight: 1.2
    },
    h3: {
        fontSize: defaultTheme.typography.pxToRem(32),
        fontWeight: 600,
        lineHeight: 1.2
    },
    h4: {
        fontSize: defaultTheme.typography.pxToRem(24),
        fontWeight: 600,
        lineHeight: 1.2
    }
};

export const shape = {
    borderRadius: 8
};

const defaultShadows = [
    'none',
    'var(--template-palette-shadow)',
    ...defaultTheme.shadows.slice(2)
];

export const shadows = defaultShadows;