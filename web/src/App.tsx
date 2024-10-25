// 根组件

import { RouterProvider } from "react-router-dom";
import router from "@/router";
import { Suspense } from "react";

function App() {
    return (
        <>
            <Suspense fallback={(<div>加载中. . . .</div>)}>
                <RouterProvider router={router} />
            </Suspense>
        </>
    );
}

export default App;
