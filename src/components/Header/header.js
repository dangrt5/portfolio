import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import "./header.css"

const Header = ({}) => (
  <header className="shadow">
    <div className="flex items-center justify-end p-4">
      <h1 className="header-link text-2xl m-0 mr-4">
        <a
          href="https://github.com/dangrt5"
          target="__blank"
          className="font-thin"
        >
          Github
        </a>
      </h1>
      <h1 className="header-link text-2xl m-0">
        <a href="mailto:randy.dang05@gmail.com" className="font-thin">
          Email
        </a>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

export default Header
