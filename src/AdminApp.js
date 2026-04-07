import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './admin/layouts/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import Members from './admin/pages/Members';
import Sales from './admin/pages/Sales';
import Stats from './admin/pages/Stats';
import Withdrawals from './admin/pages/Withdrawals';
import CMS from './admin/pages/CMS';
import Benefits from './admin/pages/Benefits';
import CustomerService from './admin/pages/CustomerService';

// Ad Mediation
import {
  AdMediationLayout,
  AdMediationDashboard,
  Networks,
  NetworkDetail,
  AdUnits,
  AdUnitDetail,
  AdMediationSettings
} from './admin/admediation';

function AdminApp() {
  return (
    <Routes>
      {/* Main Admin */}
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="members" element={<Members />} />
        <Route path="members/:id" element={<Members />} />
        <Route path="sales" element={<Sales />} />
        <Route path="stats" element={<Stats />} />
        <Route path="withdrawals" element={<Withdrawals />} />
        <Route path="cms" element={<CMS />} />
        <Route path="benefits" element={<Benefits />} />
        <Route path="cs" element={<CustomerService />} />
      </Route>

      {/* Ad Mediation Admin */}
      <Route path="admediation" element={<AdMediationLayout />}>
        <Route index element={<AdMediationDashboard />} />
        <Route path="networks" element={<Networks />} />
        <Route path="networks/:networkId" element={<NetworkDetail />} />
        <Route path="units" element={<AdUnits />} />
        <Route path="units/:unitId" element={<AdUnitDetail />} />
        <Route path="settings" element={<AdMediationSettings />} />
      </Route>
    </Routes>
  );
}

export default AdminApp;
