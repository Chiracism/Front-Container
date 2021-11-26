import { Navigate, useRoutes } from 'react-router-dom';

// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';

// Pages
import Login from './pages/Login';
import DashboardApp from './pages/DashboardApp';
import User from './pages/user/User';
import MasterFile from './pages/masterfile/masterfile';
import Mouvement from './pages/mouvement/mouvement';
import Reparation from './pages/reparation/reparation';
import Surestarie from './pages/surestarie/surestarie';
import Historic from './pages/historic';
import HistoricSurestarie from './pages/historicsurestarie';
import ImportationHistoric from './pages/historicImportation';
import Categorie from './pages/categorie';
import Client from './pages/client';
import Countrie from './pages/countrie';
import Devise from './pages/devise';
import EtatConteneur from './pages/etat_conteneur';
// import Vessel from './pages/vessel';
import Port from './pages/port';
import Rate from './pages/rate';
import Site from './pages/site';
import Size from './pages/size';
import Soussite from './pages/soussite';
import Type from './pages/type';
import Exportation from './pages/exportation/Exportation';
import Importation from './pages/importation/Importation';
import Chargeur from './pages/chargeur';
import Agence from './pages/agence';
import NotFound from './pages/Page404';
import Materiel from './pages/materiel';
import Navire from './pages/navire';
import Owner from './pages/owner';
import Choix from './pages/choix';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'masterfile', element: <MasterFile /> },
        { path: 'mouvement', element: <Mouvement /> },
        { path: 'reparation', element: <Reparation /> },
        { path: 'surestarie', element: <Surestarie /> },
        { path: 'importation', element: <Importation /> },
        { path: 'exportation', element: <Exportation /> },
        { path: 'categorie', element: <Categorie /> },
        { path: 'client', element: <Client /> },
        { path: 'choix', element: <Choix /> },
        { path: 'Countrie', element: <Countrie /> },
        { path: 'Devise', element: <Devise /> },
        { path: 'etat_conteneur', element: <EtatConteneur /> },
        { path: 'Materiel', element: <Materiel /> },
        { path: 'Navire', element: <Navire /> },
        { path: 'owner', element: <Owner /> },
        { path: 'port', element: <Port /> },
        { path: 'rate', element: <Rate /> },
        { path: 'site', element: <Site /> },
        { path: 'size', element: <Size /> },
        { path: 'soussite', element: <Soussite /> },
        { path: 'type', element: <Type /> },
        { path: 'chargeur', element: <Chargeur /> },
        { path: 'agence', element: <Agence /> },
        { path: 'historique', element: <Historic /> },
        { path: 'historicsurestarie', element: <HistoricSurestarie /> },
        { path: 'import-historique', element: <ImportationHistoric /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Login /> },
        { path: '404', element: <NotFound /> },
        { path: 'dashboard', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
