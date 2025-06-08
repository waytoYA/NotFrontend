import { Route, Routes, Navigate } from 'react-router-dom';
import {
    OTHER_ROUTE,
    STORE_ROUTE,
    PROFILE_ROUTE,
    STORE_ITEM_ROUTE,
} from './conts';
import StorePage from '@/pages/StorePage/StorePage';
import ProfilePage from '@/pages/ProfilePage/ProfilePage';
import StoreItemPage from '@/pages/StorePage/StoreItemPage/StoreItemPage';

const AppRoutes = () => {

    return (
        <Routes>

            <Route
                path={OTHER_ROUTE}
                element={<Navigate to={STORE_ROUTE} replace />}
            />

            <Route
                path={STORE_ROUTE}
                element={<StorePage />}
            />

            <Route
                path={STORE_ITEM_ROUTE}
                element={<StoreItemPage />}
            />

            <Route
                path={PROFILE_ROUTE}
                element={<ProfilePage />}
            />

        </Routes>
    )
}

export default AppRoutes;
