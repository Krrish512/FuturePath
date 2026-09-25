import React, { useState, useEffect, useMemo, useRef } from 'react';
import { api } from '../services/api';
import {
  LayoutDashboard,
  GraduationCap,
  Building2,
  BookOpen,
  Layers,
  Map,
  Briefcase,
  MapPin,
  Users,
  BarChart3,
  FileSpreadsheet,
  Settings,
  LogOut,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  Download,
  Printer,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Database
} from 'lucide-react';

export default function AdminDashboard({ onLogout }) {
  // Navigation State
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Global Data State
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);

  // Entity Lists
  const [universities, setUniversities] = useState([]);
  const [courses, setCourses] = useState([]);
  const [curriculums, setCurriculums] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [careers, setCareers] = useState([]);
  const [pathways, setPathways] = useState([]);
  const [cities, setCities] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [streams, setStreams] = useState([]);
  const [users, setUsers] = useState([]);

  // Table Controls
  const [searchTerm, setSearchTerm] = useState('');
  const [filterUniversity, setFilterUniversity] = useState('All');
  const [filterLevel, setFilterLevel] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal State (Add / Edit / View / Delete)
  const [modalMode, setModalMode] = useState(null); // 'add' | 'edit' | 'view'
  const [modalEntity, setModalEntity] = useState(null);
  const [formData, setFormData] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Report Builder State
  const [reportType, setReportType] = useState('course');
  const [reportFilters, setReportFilters] = useState({});
  const [reportColumns, setReportColumns] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [reportLoading, setReportLoading] = useState(false);
  const [showReportChart, setShowReportChart] = useState(true);
  const [reportStep, setReportStep] = useState(1);
  const printRef = useRef(null);

  const showToast = (msg, isError = false) => {
    setToastMessage({ msg, isError });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Initial Load
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [
        analyticsRes,
        unisRes,
        coursesRes,
        currsRes,
        instsRes,
        careersRes,
        pathwaysRes,
        citiesRes,
        qualsRes,
        usersRes
      ] = await Promise.all([
        api.getAnalytics().catch(() => ({ success: false })),
        api.getUniversities().catch(() => ({ success: false, data: [] })),
        api.getCourses().catch(() => ({ success: false, data: [] })),
        api.getCurriculum().catch(() => ({ success: false, data: [] })),
        api.getInstitutions().catch(() => ({ success: false, data: [] })),
        api.getCareers().catch(() => ({ success: false, data: [] })),
        api.getPathways().catch(() => ({ success: false, data: [] })),
        api.getCities().catch(() => ({ success: false, data: [] })),
        api.getQualifications().catch(() => ({ success: false, data: [] })),
        api.getAdminUsers().catch(() => ({ success: false, data: [] }))
      ]);

      if (analyticsRes.success) {
        setStats(analyticsRes.summary);
        setAnalytics(analyticsRes);
      }

      setUniversities(unisRes.data || []);
      setCourses(coursesRes.data || []);
      setCurriculums(currsRes.data || []);
      setInstitutions(instsRes.data || []);
      setCareers(careersRes.data || []);
      setPathways(pathwaysRes.data || []);
      setCities(citiesRes.data || []);
      setQualifications(qualsRes.data || []);
      setUsers(usersRes.data || []);
    } catch (err) {
      console.error('Error loading admin master data:', err);
      showToast('Failed to load some dataset tables', true);
    } finally {
      setLoading(false);
    }
  };

  // CRUD Handlers
  const handleOpenModal = (mode, entityType, item = null) => {
    setModalMode(mode);
    setModalEntity(entityType);
    if (item) {
      setFormData({ ...item });
    } else {
      setFormData({});
    }
  };

  const handleCloseModal = () => {
    setModalMode(null);
    setModalEntity(null);
    setFormData({});
  };

  const handleSaveModal = async (e) => {
    e.preventDefault();
    try {
      if (modalEntity === 'university') {
        if (modalMode === 'add') await api.createUniversity(formData);
        else await api.updateUniversity(formData._id, formData);
      } else if (modalEntity === 'course') {
        if (modalMode === 'add') await api.createCourse(formData);
        else await api.updateCourse(formData._id, formData);
      } else if (modalEntity === 'curriculum') {
        if (modalMode === 'add') await api.createCurriculum(formData);
        else await api.updateCurriculum(formData._id, formData);
      } else if (modalEntity === 'institution') {
        if (modalMode === 'add') await api.createInstitution(formData);
        else await api.updateInstitution(formData._id, formData);
      } else if (modalEntity === 'career') {
        if (modalMode === 'add') await api.createCareer(formData);
        else await api.updateCareer(formData._id, formData);
      } else if (modalEntity === 'pathway') {
        if (modalMode === 'add') await api.createPathway(formData);
        else await api.updatePathway(formData._id, formData);
      } else if (modalEntity === 'city') {
        if (modalMode === 'add') await api.createCity(formData);
      }

      showToast(`${modalEntity.toUpperCase()} saved successfully!`);
      handleCloseModal();
      loadAllData();
    } catch (err) {
      showToast(err.message || 'Operation failed', true);
    }
  };

  const handleDeleteItem = async (entityType, id) => {
    try {
      if (entityType === 'university') await api.deleteUniversity(id);
      else if (entityType === 'course') await api.deleteCourse(id);
      else if (entityType === 'curriculum') await api.deleteCurriculum(id);
      else if (entityType === 'institution') await api.deleteInstitution(id);
      else if (entityType === 'career') await api.deleteCareer(id);
      else if (entityType === 'pathway') await api.deletePathway(id);
      else if (entityType === 'city') await api.deleteCity(id);
      else if (entityType === 'user') await api.deleteUser(id);

      showToast(`Record deleted successfully`);
      setDeleteConfirm(null);
      loadAllData();
    } catch (err) {
      showToast(err.message || 'Failed to delete record', true);
    }
  };

  // Report Generation Trigger
  const handleGenerateReport = async () => {
    setReportLoading(true);
    try {
      const res = await api.generateReport({
        reportType,
        filters: reportFilters
      });
      if (res.success) {
        setReportData(res.data || []);
        setReportStep(4); // Advance to preview
      }
    } catch (err) {
      showToast(err.message || 'Report generation failed', true);
    } finally {
      setReportLoading(false);
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    if (!reportData || reportData.length === 0) return;
    const keys = reportColumns.length > 0 ? reportColumns : Object.keys(reportData[0]).filter(k => !['_id', '__v', 'createdAt', 'updatedAt'].includes(k));
    const csvContent = [
      keys.join(','),
      ...reportData.map(row => keys.map(k => {
        let val = row[k];
        if (typeof val === 'object' && val !== null) val = val.name || val.university_name || JSON.stringify(val);
        if (typeof val === 'string') val = `"${val.replace(/"/g, '""')}"`;
        return val !== undefined ? val : '';
      }).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `FuturePath_${reportType}_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print Report Handler
  const handlePrintReport = () => {
    window.print();
  };

  // Filtered & Paginated Entity Lists
  const getDisplayData = () => {
    let list = [];
    if (activeSection === 'universities') list = universities;
    else if (activeSection === 'courses') list = courses;
    else if (activeSection === 'curriculum') list = curriculums;
    else if (activeSection === 'institutions') list = institutions;
    else if (activeSection === 'careers') list = careers;
    else if (activeSection === 'pathways') list = pathways;
    else if (activeSection === 'cities') list = cities;
    else if (activeSection === 'users') list = users;

    return list.filter(item => {
      // University filter
      if (filterUniversity !== 'All') {
        const uName = item.university_name || item.name || '';
        if (!uName.toLowerCase().includes(filterUniversity.toLowerCase())) return false;
      }
      // Level filter
      if (filterLevel !== 'All' && item.course_level && item.course_level !== filterLevel) return false;
      // Status filter
      if (filterStatus !== 'All' && item.verification_status && item.verification_status !== filterStatus) return false;

      // Search term filter
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const strVal = JSON.stringify(item).toLowerCase();
        if (!strVal.includes(term)) return false;
      }
      return true;
    });
  };

  const filteredData = useMemo(() => getDisplayData(), [
    activeSection, universities, courses, curriculums, institutions, careers, pathways, cities, users,
    filterUniversity, filterLevel, filterStatus, searchTerm
  ]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Status Badge Helper
  const renderStatusBadge = (status) => {
    const s = status || 'VERIFIED';
    const isVer = s === 'VERIFIED';
    return (
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.25rem',
        padding: '0.2rem 0.6rem',
        borderRadius: '999px',
        fontSize: '0.72rem',
        fontWeight: '700',
        background: isVer ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
        color: isVer ? '#059669' : '#D97706',
        border: `1px solid ${isVer ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`
      }}>
        <CheckCircle2 size={11} /> {s}
      </span>
    );
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: toastMessage.isError ? '#EF4444' : '#10B981',
          color: '#FFFFFF',
          padding: '0.75rem 1.25rem',
          borderRadius: '8px',
          zIndex: 9999,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          fontSize: '0.875rem',
          fontWeight: '600'
        }}>
          {toastMessage.msg}
        </div>
      )}

      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? '260px' : '75px',
        background: '#FFFFFF',
        borderRight: '1px solid #E2E8F0',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.25s ease',
        zIndex: 100,
        position: 'sticky',
        top: 0,
        height: '100vh'
      }}>
        {/* Sidebar Header */}
        <div style={{
          padding: '1.25rem',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {sidebarOpen ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: '#4F46E5',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '800'
              }}>
                FP
              </div>
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0F172A' }}>FuturePath</div>
                <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: '600' }}>ADMIN PORTAL</div>
              </div>
            </div>
          ) : (
            <div style={{ margin: '0 auto', fontWeight: '800', color: '#4F46E5' }}>FP</div>
          )}

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ background: 'transparent', border: 'none', color: '#64748B', cursor: 'pointer', padding: '4px' }}
          >
            {sidebarOpen ? <ChevronLeft size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Navigation Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 0.5rem' }}>
          {/* Dashboard */}
          <div
            onClick={() => { setActiveSection('dashboard'); setCurrentPage(1); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.65rem 0.85rem',
              borderRadius: '8px',
              cursor: 'pointer',
              marginBottom: '0.5rem',
              background: activeSection === 'dashboard' ? '#EEF2FF' : 'transparent',
              color: activeSection === 'dashboard' ? '#4F46E5' : '#475569',
              fontWeight: activeSection === 'dashboard' ? '700' : '500',
              fontSize: '0.85rem'
            }}
          >
            <LayoutDashboard size={18} />
            {sidebarOpen && <span>Dashboard Overview</span>}
          </div>

          {/* Section: Content */}
          {sidebarOpen && <div style={{ fontSize: '0.65rem', fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', padding: '0.5rem 0.85rem', letterSpacing: '0.05em' }}>Education Data</div>}
          {[
            { id: 'universities', label: 'Universities', icon: GraduationCap },
            { id: 'courses', label: 'Courses Master', icon: BookOpen },
            { id: 'curriculum', label: 'Curriculum Records', icon: Layers },
            { id: 'institutions', label: 'Institutions', icon: Building2 },
            { id: 'pathways', label: 'Pathways & Roadmaps', icon: Map },
            { id: 'careers', label: 'Careers & Skills', icon: Briefcase },
            { id: 'cities', label: 'Gujarat Cities', icon: MapPin }
          ].map(tab => {
            const Icon = tab.icon;
            const isAct = activeSection === tab.id;
            return (
              <div
                key={tab.id}
                onClick={() => { setActiveSection(tab.id); setCurrentPage(1); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.6rem 0.85rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  marginBottom: '0.25rem',
                  background: isAct ? '#EEF2FF' : 'transparent',
                  color: isAct ? '#4F46E5' : '#475569',
                  fontWeight: isAct ? '700' : '500',
                  fontSize: '0.85rem',
                  transition: 'background 0.15s ease'
                }}
              >
                <Icon size={17} />
                {sidebarOpen && <span>{tab.label}</span>}
              </div>
            );
          })}

          {/* Section: Reports */}
          {sidebarOpen && <div style={{ fontSize: '0.65rem', fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', padding: '0.75rem 0.85rem 0.35rem', letterSpacing: '0.05em' }}>Reporting & Insights</div>}
          {[
            { id: 'analytics', label: 'Analytics Dashboard', icon: BarChart3 },
            { id: 'report-builder', label: 'Report Builder', icon: FileSpreadsheet }
          ].map(tab => {
            const Icon = tab.icon;
            const isAct = activeSection === tab.id;
            return (
              <div
                key={tab.id}
                onClick={() => { setActiveSection(tab.id); setCurrentPage(1); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.6rem 0.85rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  marginBottom: '0.25rem',
                  background: isAct ? '#EEF2FF' : 'transparent',
                  color: isAct ? '#4F46E5' : '#475569',
                  fontWeight: isAct ? '700' : '500',
                  fontSize: '0.85rem'
                }}
              >
                <Icon size={17} />
                {sidebarOpen && <span>{tab.label}</span>}
              </div>
            );
          })}

          {/* Section: Users */}
          {sidebarOpen && <div style={{ fontSize: '0.65rem', fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', padding: '0.75rem 0.85rem 0.35rem', letterSpacing: '0.05em' }}>User Management</div>}
          <div
            onClick={() => { setActiveSection('users'); setCurrentPage(1); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.6rem 0.85rem',
              borderRadius: '8px',
              cursor: 'pointer',
              marginBottom: '0.25rem',
              background: activeSection === 'users' ? '#EEF2FF' : 'transparent',
              color: activeSection === 'users' ? '#4F46E5' : '#475569',
              fontWeight: activeSection === 'users' ? '700' : '500',
              fontSize: '0.85rem'
            }}
          >
            <Users size={17} />
            {sidebarOpen && <span>Registered Users</span>}
          </div>
        </div>

        {/* Sidebar Footer */}
        <div style={{ padding: '0.85rem', borderTop: '1px solid #E2E8F0' }}>
          <button
            onClick={onLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 0.75rem',
              borderRadius: '8px',
              border: 'none',
              background: '#FEE2E2',
              color: '#EF4444',
              fontWeight: '600',
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            <LogOut size={16} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        {/* Section 1: Dashboard Overview */}
        {activeSection === 'dashboard' && (
          <div>
            <div style={{ marginBottom: '1.75rem' }}>
              <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.25rem' }}>
                Platform <span style={{ color: '#4F46E5' }}>Overview & Insights</span>
              </h1>
              <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
                Dynamic metrics and live data aggregates directly synchronized from MongoDB Local.
              </p>
            </div>

            {/* Statistics Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { label: 'Target Universities', val: stats?.totalUniversities || universities.length, icon: GraduationCap, col: '#4F46E5', bg: '#EEF2FF' },
                { label: 'Verified Courses', val: stats?.totalCourses || courses.length, icon: BookOpen, col: '#059669', bg: '#ECFDF5' },
                { label: 'Curriculum Records', val: stats?.totalCurriculum || curriculums.length, icon: Layers, col: '#D97706', bg: '#FFFBEB' },
                { label: 'Institutions (Colleges)', val: stats?.totalInstitutions || institutions.length, icon: Building2, col: '#0284C7', bg: '#F0F9FF' },
                { label: 'Career Roadmaps', val: stats?.totalPathways || pathways.length, icon: Map, col: '#7C3AED', bg: '#F5F3FF' },
                { label: 'Registered Students', val: stats?.totalStudents || users.filter(u => u.role === 'student').length, icon: Users, col: '#DB2777', bg: '#FDF2F8' }
              ].map((card, i) => {
                const Icon = card.icon;
                return (
                  <div key={i} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: '600' }}>{card.label}</span>
                      <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: card.bg, color: card.col, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={18} />
                      </div>
                    </div>
                    <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0F172A' }}>{card.val}</div>
                  </div>
                );
              })}
            </div>

            {/* Quick Chart Widgets */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              {/* Courses by University Column Chart */}
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#0F172A', marginBottom: '1.25rem' }}>
                  Courses Distribution by University
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {(analytics?.charts?.coursesByUniversity || []).map((u, idx) => {
                    const max = Math.max(...(analytics?.charts?.coursesByUniversity || []).map(x => x.value), 1);
                    const pct = Math.round((u.value / max) * 100);
                    return (
                      <div key={idx}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                          <span style={{ color: '#334155' }}>{u.label}</span>
                          <span style={{ color: '#4F46E5' }}>{u.value} courses</span>
                        </div>
                        <div style={{ width: '100%', height: '8px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${pct}%`, height: '100%', background: '#4F46E5', borderRadius: '4px' }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Course Level Distribution */}
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#0F172A', marginBottom: '1.25rem' }}>
                  Course Level Breakdown
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {(analytics?.charts?.coursesByLevel || []).map((lvl, idx) => {
                    const total = courses.length || 1;
                    const pct = Math.round((lvl.value / total) * 100);
                    return (
                      <div key={idx}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                          <span style={{ color: '#334155' }}>{lvl.label}</span>
                          <span style={{ color: '#059669' }}>{lvl.value} ({pct}%)</span>
                        </div>
                        <div style={{ width: '100%', height: '8px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${pct}%`, height: '100%', background: '#10B981', borderRadius: '4px' }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 2: CRUD Data Tables (Universities, Courses, Curriculum, Institutions, etc.) */}
        {['universities', 'courses', 'curriculum', 'institutions', 'pathways', 'careers', 'cities', 'users'].includes(activeSection) && (
          <div>
            {/* Header with Title and Add Button */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0F172A', textTransform: 'capitalize' }}>
                  {activeSection} Master Directory
                </h2>
                <p style={{ color: '#64748B', fontSize: '0.85rem' }}>
                  Manage verified Gujarat education dataset records ({filteredData.length} total entries).
                </p>
              </div>

              {activeSection !== 'users' && (
                <button
                  onClick={() => handleOpenModal('add', activeSection.slice(0, -1))}
                  className="btn btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', padding: '0.5rem 1rem', borderRadius: '8px' }}
                >
                  <Plus size={16} /> Add New {activeSection.slice(0, -1)}
                </button>
              )}
            </div>

            {/* Filter and Search Bar */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
                <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '10px', top: '10px' }} />
                <input
                  type="text"
                  placeholder={`Search ${activeSection}...`}
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  style={{ width: '100%', padding: '0.45rem 0.5rem 0.45rem 2.2rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                />
              </div>

              {activeSection === 'courses' && (
                <>
                  <select
                    value={filterUniversity}
                    onChange={(e) => { setFilterUniversity(e.target.value); setCurrentPage(1); }}
                    style={{ padding: '0.45rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  >
                    <option value="All">All Universities</option>
                    {universities.map(u => <option key={u._id} value={u.university_name}>{u.abbreviation || u.university_name}</option>)}
                  </select>

                  <select
                    value={filterLevel}
                    onChange={(e) => { setFilterLevel(e.target.value); setCurrentPage(1); }}
                    style={{ padding: '0.45rem', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  >
                    <option value="All">All Levels</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                    <option value="Integrated (UG+PG)">Integrated (UG+PG)</option>
                  </select>
                </>
              )}
            </div>

            {/* Table */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569', fontWeight: '700' }}>
                      <th style={{ padding: '0.75rem 1rem' }}>ID / Code</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Name / Title</th>
                      {activeSection === 'courses' && <th style={{ padding: '0.75rem 1rem' }}>University</th>}
                      {activeSection === 'courses' && <th style={{ padding: '0.75rem 1rem' }}>Level & Duration</th>}
                      {activeSection === 'curriculum' && <th style={{ padding: '0.75rem 1rem' }}>Course & Sem</th>}
                      {activeSection === 'curriculum' && <th style={{ padding: '0.75rem 1rem' }}>Type & Credits</th>}
                      {activeSection === 'institutions' && <th style={{ padding: '0.75rem 1rem' }}>Type & City</th>}
                      {activeSection === 'users' && <th style={{ padding: '0.75rem 1rem' }}>Email & Role</th>}
                      <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                      <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.length === 0 ? (
                      <tr>
                        <td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: '#94A3B8' }}>
                          No records found matching current criteria.
                        </td>
                      </tr>
                    ) : (
                      paginatedData.map((row, idx) => (
                        <tr key={row._id || idx} style={{ borderBottom: '1px solid #F1F5F9' }}>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: '700', color: '#4F46E5' }}>
                            {row.course_id || row.curriculum_id || row.university_id || row.subject_code || (idx + 1)}
                          </td>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#0F172A' }}>
                            {row.course_name || row.name || row.university_name || row.subject_name || row.title}
                          </td>
                          {activeSection === 'courses' && (
                            <td style={{ padding: '0.75rem 1rem', color: '#475569' }}>
                              {row.university_name}
                            </td>
                          )}
                          {activeSection === 'courses' && (
                            <td style={{ padding: '0.75rem 1rem', color: '#475569' }}>
                              {row.course_level} • {row.duration}
                            </td>
                          )}
                          {activeSection === 'curriculum' && (
                            <td style={{ padding: '0.75rem 1rem', color: '#475569' }}>
                              {row.course_name} (Sem {row.semester_number})
                            </td>
                          )}
                          {activeSection === 'curriculum' && (
                            <td style={{ padding: '0.75rem 1rem', color: '#475569' }}>
                              {row.subject_type || 'Core'} ({row.credits || '4'} Cr)
                            </td>
                          )}
                          {activeSection === 'institutions' && (
                            <td style={{ padding: '0.75rem 1rem', color: '#475569' }}>
                              {row.type} • {typeof row.city === 'object' ? row.city?.name : row.city}
                            </td>
                          )}
                          {activeSection === 'users' && (
                            <td style={{ padding: '0.75rem 1rem', color: '#475569' }}>
                              {row.email} • <span className="badge badge-primary">{row.role}</span>
                            </td>
                          )}
                          <td style={{ padding: '0.75rem 1rem' }}>
                            {renderStatusBadge(row.verification_status)}
                          </td>
                          <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                              <button
                                onClick={() => handleOpenModal('view', activeSection.slice(0, -1), row)}
                                style={{ background: '#F1F5F9', border: 'none', borderRadius: '6px', padding: '4px 8px', color: '#475569', cursor: 'pointer' }}
                                title="View Details"
                              >
                                <Eye size={14} />
                              </button>
                              {activeSection !== 'users' && (
                                <button
                                  onClick={() => handleOpenModal('edit', activeSection.slice(0, -1), row)}
                                  style={{ background: '#EEF2FF', border: 'none', borderRadius: '6px', padding: '4px 8px', color: '#4F46E5', cursor: 'pointer' }}
                                  title="Edit Record"
                                >
                                  <Edit2 size={14} />
                                </button>
                              )}
                              <button
                                onClick={() => setDeleteConfirm({ type: activeSection.slice(0, -1), id: row._id, name: row.name || row.course_name || row.title })}
                                style={{ background: '#FEE2E2', border: 'none', borderRadius: '6px', padding: '4px 8px', color: '#EF4444', cursor: 'pointer' }}
                                title="Delete Record"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} records
                </span>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    style={{ padding: '4px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', background: currentPage === 1 ? '#F8FAFC' : '#FFFFFF', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                  >
                    Prev
                  </button>
                  <span style={{ padding: '4px 8px', fontSize: '0.85rem', fontWeight: '600' }}>{currentPage} / {totalPages}</span>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    style={{ padding: '4px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', background: currentPage === totalPages ? '#F8FAFC' : '#FFFFFF', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 3: Analytics Page */}
        {activeSection === 'analytics' && (
          <div>
            <div style={{ marginBottom: '1.75rem' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0F172A' }}>
                Education Dataset <span style={{ color: '#4F46E5' }}>Analytics</span>
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
                Quantitative intelligence and distribution trends across accredited institutions and programs.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
              {/* Field of Study Column Chart */}
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#0F172A', marginBottom: '1.25rem' }}>
                  Top Fields of Study
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {(analytics?.charts?.coursesByField || []).map((f, idx) => {
                    const max = Math.max(...(analytics?.charts?.coursesByField || []).map(x => x.value), 1);
                    const pct = Math.round((f.value / max) * 100);
                    return (
                      <div key={idx}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                          <span style={{ color: '#334155' }}>{f.label}</span>
                          <span style={{ color: '#4F46E5' }}>{f.value}</span>
                        </div>
                        <div style={{ width: '100%', height: '8px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${pct}%`, height: '100%', background: '#4F46E5', borderRadius: '4px' }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Institutions by City */}
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#0F172A', marginBottom: '1.25rem' }}>
                  Institutions Geographic Coverage
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {(analytics?.charts?.institutionsByCity || []).map((c, idx) => {
                    return (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #F1F5F9' }}>
                        <span style={{ fontWeight: '600', color: '#1E293B' }}>📍 {c.label}</span>
                        <span style={{ fontWeight: '700', color: '#0284C7' }}>{c.value} Colleges / Univ</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 4: Report Builder */}
        {activeSection === 'report-builder' && (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0F172A' }}>
                FuturePath <span style={{ color: '#4F46E5' }}>Report Builder</span>
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
                Generate customized administrative audit reports with dynamic filters, charts, and instant export to PDF, Excel, and CSV.
              </p>
            </div>

            {/* Step Wizard Container */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1.75rem', marginBottom: '1.5rem' }}>
              {/* Step 1: Select Type */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.5rem' }}>
                  Step 1: Select Master Report Entity
                </label>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {[
                    { id: 'course', label: 'Course Catalog Report' },
                    { id: 'university', label: 'University Directory Report' },
                    { id: 'curriculum', label: 'Curriculum & Subjects Report' },
                    { id: 'institution', label: 'Institution Affiliation Report' },
                    { id: 'career', label: 'Career Roadmap Report' },
                    { id: 'user', label: 'User & Student Account Report' }
                  ].map(rt => (
                    <button
                      key={rt.id}
                      onClick={() => { setReportType(rt.id); setReportData([]); }}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        border: reportType === rt.id ? '2px solid #4F46E5' : '1px solid #CBD5E1',
                        background: reportType === rt.id ? '#EEF2FF' : '#FFFFFF',
                        color: reportType === rt.id ? '#4F46E5' : '#334155',
                        fontWeight: '600',
                        fontSize: '0.825rem',
                        cursor: 'pointer'
                      }}
                    >
                      {rt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Filters */}
              <div style={{ marginBottom: '1.5rem', background: '#F8FAFC', padding: '1rem', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '0.75rem' }}>
                  Step 2: Apply Filters
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                  {reportType === 'course' && (
                    <>
                      <select
                        onChange={(e) => setReportFilters(f => ({ ...f, university_name: e.target.value === 'All' ? undefined : e.target.value }))}
                        style={{ padding: '0.45rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                      >
                        <option value="All">All Universities</option>
                        {universities.map(u => <option key={u._id} value={u.university_name}>{u.university_name}</option>)}
                      </select>
                      <select
                        onChange={(e) => setReportFilters(f => ({ ...f, course_level: e.target.value === 'All' ? undefined : e.target.value }))}
                        style={{ padding: '0.45rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                      >
                        <option value="All">All Course Levels</option>
                        <option value="Undergraduate">Undergraduate</option>
                        <option value="Postgraduate">Postgraduate</option>
                        <option value="Integrated (UG+PG)">Integrated (UG+PG)</option>
                      </select>
                    </>
                  )}
                  {reportType === 'curriculum' && (
                    <select
                      onChange={(e) => setReportFilters(f => ({ ...f, university_id: e.target.value === 'All' ? undefined : e.target.value }))}
                      style={{ padding: '0.45rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                    >
                      <option value="All">All Universities</option>
                      {universities.map(u => <option key={u._id} value={u.university_id}>{u.university_name}</option>)}
                    </select>
                  )}
                </div>
              </div>

              {/* Generate Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <button
                  onClick={handleGenerateReport}
                  disabled={reportLoading}
                  className="btn btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.5rem', fontWeight: '700', borderRadius: '8px' }}
                >
                  <Sparkles size={16} /> {reportLoading ? 'Generating Report...' : 'Compile Live Report'}
                </button>
              </div>
            </div>

            {/* Generated Report Preview Area */}
            {reportData.length > 0 && (
              <div ref={printRef} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                {/* Print Header */}
                <div style={{ borderBottom: '2px solid #4F46E5', paddingBottom: '1rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                      FuturePath Education Portal
                    </h3>
                    <div style={{ fontSize: '0.9rem', color: '#4F46E5', fontWeight: '700' }}>
                      Official {reportType.toUpperCase()} Administrative Report
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.2rem' }}>
                      Generated on: {new Date().toLocaleString()} • Database: MongoDB Local Master
                    </div>
                  </div>

                  {/* Export Buttons */}
                  <div className="no-print" style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={handleExportCSV}
                      className="btn btn-secondary"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', padding: '0.45rem 0.85rem', borderRadius: '6px' }}
                    >
                      <Download size={14} /> Export CSV / Excel
                    </button>
                    <button
                      onClick={handlePrintReport}
                      className="btn btn-primary"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', padding: '0.45rem 0.85rem', borderRadius: '6px' }}
                    >
                      <Printer size={14} /> Print / Save PDF
                    </button>
                  </div>
                </div>

                {/* Report Table */}
                <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
                    <thead>
                      <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #CBD5E1', color: '#1E293B', textAlign: 'left' }}>
                        <th style={{ padding: '0.6rem 0.8rem' }}>#</th>
                        <th style={{ padding: '0.6rem 0.8rem' }}>Identifier</th>
                        <th style={{ padding: '0.6rem 0.8rem' }}>Name / Title</th>
                        {reportType === 'course' && <th style={{ padding: '0.6rem 0.8rem' }}>University</th>}
                        {reportType === 'course' && <th style={{ padding: '0.6rem 0.8rem' }}>Level & Duration</th>}
                        {reportType === 'curriculum' && <th style={{ padding: '0.6rem 0.8rem' }}>Subject Code & Name</th>}
                        {reportType === 'curriculum' && <th style={{ padding: '0.6rem 0.8rem' }}>Credits & Type</th>}
                        <th style={{ padding: '0.6rem 0.8rem' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.map((row, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #E2E8F0' }}>
                          <td style={{ padding: '0.6rem 0.8rem', color: '#64748B' }}>{idx + 1}</td>
                          <td style={{ padding: '0.6rem 0.8rem', fontWeight: '700', color: '#4F46E5' }}>
                            {row.course_id || row.curriculum_id || row.university_id || row.abbreviation || (idx + 1)}
                          </td>
                          <td style={{ padding: '0.6rem 0.8rem', fontWeight: '600', color: '#0F172A' }}>
                            {row.course_name || row.name || row.university_name || row.subject_name || row.title}
                          </td>
                          {reportType === 'course' && <td style={{ padding: '0.6rem 0.8rem' }}>{row.university_name}</td>}
                          {reportType === 'course' && <td style={{ padding: '0.6rem 0.8rem' }}>{row.course_level} ({row.duration})</td>}
                          {reportType === 'curriculum' && <td style={{ padding: '0.6rem 0.8rem' }}>{row.subject_code} - {row.subject_name}</td>}
                          {reportType === 'curriculum' && <td style={{ padding: '0.6rem 0.8rem' }}>{row.credits} Cr ({row.subject_type})</td>}
                          <td style={{ padding: '0.6rem 0.8rem' }}>{renderStatusBadge(row.verification_status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Print Footer */}
                <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748B' }}>
                  <div>FuturePath Education Guidance Master System</div>
                  <div>Report Count: {reportData.length} Records Verified</div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Add / Edit / View Modal */}
      {modalMode && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1rem'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            maxWidth: '560px',
            width: '100%',
            maxHeight: '85vh',
            overflowY: 'auto',
            padding: '1.75rem',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            border: '1px solid #E2E8F0'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A', textTransform: 'capitalize' }}>
                {modalMode} {modalEntity}
              </h3>
              <button onClick={handleCloseModal} style={{ background: 'transparent', border: 'none', fontSize: '1.25rem', color: '#64748B', cursor: 'pointer' }}>✕</button>
            </div>

            {modalMode === 'view' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                {Object.entries(formData).map(([k, v]) => {
                  if (['_id', '__v', 'createdAt', 'updatedAt'].includes(k)) return null;
                  return (
                    <div key={k} style={{ background: '#F8FAFC', padding: '0.5rem 0.75rem', borderRadius: '6px' }}>
                      <span style={{ fontWeight: '700', color: '#4F46E5', textTransform: 'capitalize' }}>{k.replace(/_/g, ' ')}: </span>
                      <span style={{ color: '#1E293B' }}>{typeof v === 'object' ? JSON.stringify(v) : String(v)}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <form onSubmit={handleSaveModal} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.25rem' }}>Name / Title</label>
                  <input
                    type="text"
                    required
                    value={formData.course_name || formData.name || formData.university_name || formData.subject_name || formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value, course_name: e.target.value, university_name: e.target.value, subject_name: e.target.value, title: e.target.value })}
                    style={{ width: '100%', padding: '0.45rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  />
                </div>

                {modalEntity === 'course' && (
                  <>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.25rem' }}>University</label>
                      <select
                        value={formData.university_name || ''}
                        onChange={(e) => {
                          const sel = universities.find(u => u.university_name === e.target.value);
                          setFormData({ ...formData, university_name: e.target.value, university_id: sel?.university_id || '' });
                        }}
                        style={{ width: '100%', padding: '0.45rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                      >
                        <option value="">Select University</option>
                        {universities.map(u => <option key={u._id} value={u.university_name}>{u.university_name}</option>)}
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.25rem' }}>Duration</label>
                      <input
                        type="text"
                        value={formData.duration || ''}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        placeholder="e.g. 3 Years / 4 Years"
                        style={{ width: '100%', padding: '0.45rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.25rem' }}>Eligibility</label>
                      <textarea
                        value={formData.eligibility || ''}
                        onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                        style={{ width: '100%', padding: '0.45rem', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem', minHeight: '60px' }}
                      />
                    </div>
                  </>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button type="button" onClick={handleCloseModal} className="btn btn-secondary" style={{ padding: '0.45rem 1rem', borderRadius: '6px' }}>Cancel</button>
                  <button type="submit" className="btn btn-primary" style={{ padding: '0.45rem 1.25rem', borderRadius: '6px' }}>Save Record</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1rem'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            maxWidth: '420px',
            width: '100%',
            padding: '1.5rem',
            textAlign: 'center',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          }}>
            <AlertTriangle size={36} color="#EF4444" style={{ margin: '0 auto 0.75rem' }} />
            <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.5rem' }}>Confirm Delete</h4>
            <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.25rem' }}>
              Are you sure you want to permanently delete <strong>{deleteConfirm.name}</strong>? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
              <button onClick={() => setDeleteConfirm(null)} className="btn btn-secondary" style={{ padding: '0.45rem 1.25rem', borderRadius: '6px' }}>Cancel</button>
              <button onClick={() => handleDeleteItem(deleteConfirm.type, deleteConfirm.id)} className="btn btn-danger" style={{ padding: '0.45rem 1.25rem', borderRadius: '6px', background: '#EF4444', color: '#FFF', border: 'none' }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
