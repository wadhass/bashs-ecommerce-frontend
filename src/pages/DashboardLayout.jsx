import { Outlet, NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';

const DashboardLayout = () => {
  const user = useSelector((state) => state.auth.user);
  const adminLinks = [
    { label: 'Dashboard', path: '/dashboard/admin' },
    { label: 'Manage Items', path: '/dashboard/manage-products' },
    { label: 'All Orders', path: '/dashboard/manage-orders' },
    { label: 'Add New Post', path: '/dashboard/add-new-post' },
  ];

  const userLinks = [
    { label: 'Overview', path: '/dashboard' },
    { label: 'Payments', path: '/dashboard/payments' },
    { label: 'Profile', path: '/dashboard/profile' },
    { label: 'Reviews', path: '/dashboard/reviews' },
    { label: 'Orders', path: '/dashboard/orders' },
  ];

  const links = user?.role === 'admin' ? adminLinks : userLinks;

  return (
    <div className="flex">
      <aside className="w-64 bg-gray-100 p-4 h-screen">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `block rounded px-3 py-2 ${isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-200'}`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
