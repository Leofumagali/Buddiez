import { useTheme } from './hooks/useTheme';
import { Login } from './pages/Login';
import './styles/global.scss';
import { themes } from './styles/themes';

export function App() {
  useTheme(themes.light)

  return (
    <div className="App">
      <Login />
    </div>
  )
}
