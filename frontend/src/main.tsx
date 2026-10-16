import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Outlet } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from './pages/App.tsx'
import Home from './pages/Home.tsx'
import Contacts from './pages/Contacts.tsx'
import Gallery from './pages/Gallery.tsx';
import Performance from './pages/Performance.tsx';
import Popup from './components/Popup.tsx';
import VisualArtwork from './pages/VisualArtwork.tsx';

// Cria a estrutura das paginas para o React Router
// A pagina 'parent' é / e todas as outras são consideradas childs
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement é basicamente a página 404 (not found)
    // Neste momento está a redirecionar para a App que carrega
    // A home, mas podemos fazer uma página custom.
    // Element identifica o componente/página que essa route usará
    errorElement: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "projects",
        element: <Outlet />, // Outlet pq é parent da galeria, performance, etc
        children: [
          {
            path: "gallery",
            element: <Gallery />,
          },
          {
            path: "performances",
            element: <Performance />,
            children: [
              {
                path: ":title/:docId",
                element: <Popup />
              },
            ]
          },
          {
            path: "visual-artwork",
            element: <VisualArtwork />
          },
        ]
      },
      {
        path: "contact",
        element: <Contacts />
      }
  ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* RouterProvider carrega a pagina e componente baseado nas routes definidas anteriormente */}
    <RouterProvider router={router} />
  </StrictMode>
)
