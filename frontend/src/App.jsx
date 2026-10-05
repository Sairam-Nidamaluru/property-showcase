import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import PropertyList from './pages/properties/PropertyList'
import PropertyDetails from './pages/property-details/PropertyDetails'
import AdminDashboard from './pages/admin/AdminDashboard'
import PropertyCreate from './pages/admin/PropertyCreate'
import PropertyEdit from './pages/admin/PropertyEdit'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={<PropertyList />}
          />

          <Route
            path="/property/:id"
            element={<PropertyDetails />}
          />

          <Route
            path="/admin"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/properties/new"
            element={<PropertyCreate />}
          />

          <Route
            path="/admin/properties/:id/edit"
            element={<PropertyEdit />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App