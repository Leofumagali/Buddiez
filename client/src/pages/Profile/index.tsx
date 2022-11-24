import { SideMenu } from '../../components/SideMenu'
import './styles.scss'

export function Profile() {
  return (
    <div className='container'>
      <SideMenu />

      <main>
        <section className='profile-container'>
          <div className='profile-infos'>
            <div className='infos'>

            </div>

            <article className='description'>
              a really nice description about a good cat with nice intentions and how never thought about world domination
            </article>

            <div className='posts-and-followers'>
              <span>70 posts</span>
              <span>45 followers</span>
              <span>50 following</span>
            </div>
          </div>

          <div className='profile-posts'>

          </div>
        </section>
      </main>
    </div>
  )
}