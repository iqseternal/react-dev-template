import { userLogin, userLogout } from '@/features';
import { retrieveRoutes } from '@router/index';
import { toPicket } from '@suey/pkg-utils';
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom';





export default function Workstation() {
  const navigate = useNavigate();

  const restore = useCallback(async () => {
    const [err] = await toPicket(userLogout());

    const { loginRoute } = retrieveRoutes();
    navigate(loginRoute.meta.fullPath, { replace: true });
  }, []);

  return <>

    <button
      onClick={restore}
    >
      Workstation

    </button>
  </>
}
