import { useTheme } from './hooks/useTheme';
import { Profile } from './pages/Profile';
import './styles/global.scss';
import { themes } from './styles/themes';

export function App() {
  useTheme(themes.light)

  return (
    <div className="App">
      {/* <Login /> */}
      <Profile />
    </div>
  )
}
