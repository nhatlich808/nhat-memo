import { gray } from "../theme.jsx";

export const surfacesCustomizations = {
    MuiPaper: {
        defaultProps: {
            elevation: 1,
            variant: 'elevation',
            square: false
        },
        styleOverrides: {
            root: ({theme}) => {
                return {
                    backgroudColor: gray[50],
                    transition: 'all 100ms ease',
                    borderRadius: (theme.vars || theme).shape.borderRadius,
                    border: `1px solid ${(theme.vars || theme).palette.divider}`,
                    boxShadow: 'none',
                    ...theme.applyStyles('dark', {
                        backgroudColor: gray[800],
                    }),
                }
            }
        }
    },
}