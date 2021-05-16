import { lazy, Suspense } from 'react';

const LoginComponent = lazy(() => import('../components/Login/Login'));
const HomeComponent = lazy(() => import('../components/Home'));

export const Login = () => (
    <Suspense fallback={<div className="waiting">Cargando o espere unos segundos...</div>}>
        <LoginComponent/>
    </Suspense>
);

export const Home = () => (
    <Suspense fallback={<div className="waiting">Cargando o espere unos segundos...</div>}>
        <HomeComponent/>
    </Suspense>
);