import * as React from 'react'
import PropTypes from 'prop-types'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { colorSchemes, typography, shape, shadows } from './theme.jsx';
import { surfacesCustomizations } from './customizations/surfaces.jsx';

function AppTheme(props) {
    const { children, disableCustomTheme, themeComponents } = props;

    const theme = React.useMemo(() => {
        return disableCustomTheme
            ? {}
            : createTheme({
                colorSchemes,
                typography,
                shape,
                shadows,
                components: {
                    ...surfacesCustomizations,
                    ...themeComponents
                }
            });
    }, [disableCustomTheme, themeComponents]);

    if (disableCustomTheme) {
        return <React.Fragment>{children}</React.Fragment>
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            {children}
        </ThemeProvider>
    );
}

AppTheme.propTypes = {
    children: PropTypes.node,
    disableCustomTheme: PropTypes.bool,
    themeComponents: PropTypes.object
}

export default AppTheme;