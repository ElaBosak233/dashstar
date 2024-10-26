// 根组件

import { RouterProvider } from "react-router-dom";
import router from "@/router";

function App() {
    return (
        <>
            <RouterProvider router={router} fallbackElement={<div>加载中. . . .</div>} />
        </>
    );
}

export default App;
