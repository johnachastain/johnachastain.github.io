import React from "react"
import { Link } from "gatsby"
import './layout.sass'

const Header = () => {
  return (
    <header className='sticky'>
        <nav className='header-inner'>
            <ul className='header-left'>
                <li>
                    <Link to={`/contact`}>
                        contact
                    </Link>
                </li>
            </ul>
            <ul className='social header-center'>
                <li>
                    <a href='https://www.artstation.com/johnachastain'>
                        <img src='/svg/artstation.svg' alt='artstation' />
                    </a>
                </li>
                <li>
                    <a href='https://www.behance.net/picastudio'>
                        <img src='/svg/behance.svg' alt='behance' />
                    </a>
                </li>
                <li>
                    <a href='https://dribbble.com/picastudio'>
                        <img src='/svg/dribbble.svg' alt='dribbble' />
                    </a>
                </li>
                <li>
                    <a href='https://www.instagram.com/johnachastain/'>
                        <img src='/svg/instagram.svg' alt='instagram' />
                    </a>
                </li>
            </ul>
            <ul className='header-right'>
                <li>
                    <Link to={`/about`}>
                        about
                    </Link>
                </li>
            </ul>
        </nav>
    </header>
  )
}

const HeaderV2 = ({ location }) => {
    const rootPath = `${__PATH_PREFIX__}/`;
    const isHome = location.pathname === rootPath
    return (
      <header className='sticky'>
          <nav className='header-inner'>
              <ul className='header-left'>
                    {!isHome ? <li>
                      <Link
                        to={rootPath}
                        className='with-divider'>
                          home
                      </Link>
                  </li> : null}
                  <li>
                      <Link
                      to={`/contact`}
                      state={{ modal: true }}
                      className='with-divider'>
                          contact
                      </Link>
                  </li>
                  <li>
                      <Link
                      to={`/about`}
                      state={{ modal: true }}>
                          about
                      </Link>
                  </li>
              </ul>
              <ul className='social header-right'>
                  <li>
                      <a href='https://www.artstation.com/johnachastain'>
                          <img src='/svg/artstation.svg' alt='artstation' />
                      </a>
                  </li>
                  <li>
                      <a href='https://www.behance.net/picastudio'>
                          <img src='/svg/behance.svg' alt='behance' />
                      </a>
                  </li>
                  <li>
                      <a href='https://dribbble.com/picastudio'>
                          <img src='/svg/dribbble.svg' alt='dribbble' />
                      </a>
                  </li>
                  <li>
                      <a href='https://www.instagram.com/johnachastain/'>
                          <img src='/svg/instagram.svg' alt='instagram' />
                      </a>
                  </li>
              </ul>
          </nav>
      </header>
    )
  }

const Layout = ({ location = {}, children }) => {

    return (
      <div>
        <HeaderV2 {...{ location }} />
        <div className='letterhead'>
            <img
                src='/assets/greenman-desaturated.jpg'
                className='letterhead-img' alt='' />
            <hgroup>
                <h1>
                    John Andrew Chastain
                </h1>
                <h2>
                    {'{ Art '}
                    <img
                        src='/assets/ampersand.svg'
                        className='ampersand'
                        alt='ampersand' />
                    {' Illustration }'}
                </h2>
            </hgroup>
        </div>
        <main>
            {children}
        </main>
        <footer>
          {`{ © Copyright ${new Date().getFullYear()}. All Rights Reserved. }`}
        </footer>
      </div>
    )
}

export default Layout
