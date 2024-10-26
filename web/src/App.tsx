// 根组件

import { RouterProvider } from "react-router-dom";
import router from "@/router";
import { ThemeContextProvider } from "@/components/NavigationBar.tsx";


function App() {
    return (
        <>
            <ThemeContextProvider>

                <RouterProvider router={router} fallbackElement={<div>加载中. . . .</div>} />
            </ThemeContextProvider>
        </>
    );
}

export default App;
