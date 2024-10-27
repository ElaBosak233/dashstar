// 持久化存储明暗主题信息, 大标题信息.
import { create } from "zustand";


interface SiteState {
    currentTitle?: string;
    setCurrentTitle: (title: string) => void;

    isDarkMode?: boolean;
    toggleTheme: () => void;
}


const useSiteStore = create<SiteState>()(
    (set, get) => ({
        setCurrentTitle: (title: string) => {
            set({ currentTitle: title });
        },
        isDarkMode: false,
        toggleTheme: () => {
            set({ isDarkMode: !get().isDarkMode })
        }
    }),
);

export default useSiteStore;
