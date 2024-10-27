// 根组件

import { RouterProvider } from "react-router-dom";
import router from "@/router";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Skeleton } from "@mui/material";
import useSiteStore from "@/stores/site.ts";
import { ThemeContext } from "@emotion/react";
import { useMemo } from "react";


function App() {
    const siteStore = useSiteStore();

    const theme = useMemo(() => createTheme({
        palette: {
            mode: siteStore?.isDarkMode ? "dark" : "light",
        },
    }), [siteStore?.isDarkMode]);

    return (
        <>
            <ThemeContext.Provider value={{ toggleTheme: siteStore?.toggleTheme, isDarkMode: siteStore?.isDarkMode }}>
                <ThemeProvider theme={theme}>
                    <CssBaseline /> {/* 确保 MUI 的样式全局生效 */}
                    <RouterProvider router={router} fallbackElement={<Skeleton sx={{ bgcolor: "grey.900" }}
                                                                               variant="rectangular"
                                                                               width={210}
                                                                               height={118} />} />
                </ThemeProvider>
            </ThemeContext.Provider>

        </>
    );
}

export default App;
