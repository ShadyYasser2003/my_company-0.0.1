import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Portfolio } from './pages/Portfolio';
import { ProjectDetail } from './pages/ProjectDetail';
import { Contact } from './pages/Contact';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminCategories } from './pages/admin/AdminCategories';
import { AdminProjects } from './pages/admin/AdminProjects';
import { AdminServices } from './pages/admin/AdminServices';
import { DataInitializer } from './pages/admin/DataInitializer';
import { AdminSettingsEnhanced as AdminSettings } from './pages/admin/AdminSettingsEnhanced';
import { AdminMessages } from './pages/admin/AdminMessages';
import { Toaster } from 'sonner@2.0.3';

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <ThemeProvider>
        <AuthProvider>
          <SettingsProvider>
            <Toaster position="top-right" richColors />
            <Routes>
              {/* ============================================ */}
              {/* PUBLIC WEBSITE ROUTES                        */}
              {/* ============================================ */}
              <Route
                path="/"
                element={
                  <PublicLayout>
                    <Home />
                  </PublicLayout>
                }
              />
              <Route
                path="/about"
                element={
                  <PublicLayout>
                    <About />
                  </PublicLayout>
                }
              />
              <Route
                path="/services"
                element={
                  <PublicLayout>
                    <Services />
                  </PublicLayout>
                }
              />
              <Route
                path="/portfolio"
                element={
                  <PublicLayout>
                    <Portfolio />
                  </PublicLayout>
                }
              />
              <Route
                path="/portfolio/:id"
                element={
                  <PublicLayout>
                    <ProjectDetail />
                  </PublicLayout>
                }
              />
              <Route
                path="/contact"
                element={
                  <PublicLayout>
                    <Contact />
                  </PublicLayout>
                }
              />

              {/* ============================================ */}
              {/* ADMIN PANEL ROUTES (SEPARATE PORTAL)         */}
              {/* Access: Direct URL only (e.g., /admin)       */}
              {/* ============================================ */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="categories" element={<AdminCategories />} />
                <Route path="projects" element={<AdminProjects />} />
                <Route path="services" element={<AdminServices />} />
                <Route path="messages" element={<AdminMessages />} />
                <Route path="initialize-data" element={<DataInitializer />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>

              {/* Catch-all redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </SettingsProvider>
        </AuthProvider>
      </ThemeProvider>
    </HashRouter>
  );
}