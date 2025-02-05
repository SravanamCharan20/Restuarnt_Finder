import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import CuisineSearch from './pages/CuisineSearch';
import RestaurantDetail from './pages/RestaurantDetail';
import ErrorBoundary from './components/ErrorBoundary';


export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cuisine-search" element={<CuisineSearch />} />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  )
}
