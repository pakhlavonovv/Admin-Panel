import { NavLink } from "react-router-dom"
import './style.css'

const Index = () => {
  return (
    <>
      <div className="content">
        <svg viewBox="0 0 960 300" style={{
          font: "10.5em 'Monoton'",
          width: "100%",
          height: "100vh"
        }}>
          <h1 className="text-white">Aa</h1>
          <symbol id="s-text">
            <text textAnchor="middle" x="50%" y="50%">
              404
            </text>
          </symbol>
          <g className="g-ants">
            <use xlinkHref="#s-text" className="text" />
            <use xlinkHref="#s-text" className="text" />
            <use xlinkHref="#s-text" className="text" />
            <use xlinkHref="#s-text" className="text" />
            <use xlinkHref="#s-text" className="text" />
          </g>
        </svg>
      </div>
    </>
  )
}

export default Index
