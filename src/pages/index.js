import React from "react"
import Layout from "../components/Layout/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import skills from "../images/up-level.svg"
import softwareEngineerImg from "../images/software-engineer.svg"

const IndexPage = () => (
  <Layout pageTitle="Randy Dang">
    <SEO title="Home" />
    <div className="flex justify-center flex-col items-center pt-8 mb-8">
      <h1 className="mb-1 font-medium text-4xl">Randy Dang</h1>
      <h1 className="m-0 font-light text-3xl">Software Engineer</h1>
    </div>
    <div className="flex items-center mb-4">
      <img className="w-12 mr-4" src={softwareEngineerImg} />
      <p className="text-2xl">Software Engineer</p>
    </div>
    <div className="flex items-center mb-4">
      <img className="w-12 mr-4" src={softwareEngineerImg} />
      <p className="text-2xl leading-relaxed">
        Focusing on: Python, TailwindCSS
      </p>
    </div>
    <div className="flex items-center">
      <img className="w-12 mr-4" src={skills} />
      <p className="text-2xl leading-relaxed">
        Stack: JavaScript, React, Node, PostgreSQL, MongoDB
      </p>
    </div>

    {/* <Link to="/page-2/">Go to page 2</Link> */}
  </Layout>
)

export default IndexPage
