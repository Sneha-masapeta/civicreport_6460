import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import CitizenLogin from './pages/citizen-login';
import AnalyticsDashboard from './pages/analytics-dashboard';
import AdminDashboard from './pages/admin-dashboard';
import IssueTracking from './pages/issue-tracking';
import ReportManagement from './pages/report-management';
import CitizenDashboard from './pages/citizen-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/citizen-login" element={<CitizenLogin />} />
        <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/issue-tracking" element={<IssueTracking />} />
        <Route path="/report-management" element={<ReportManagement />} />
        <Route path="/citizen-dashboard" element={<CitizenDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
