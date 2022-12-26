import { NavLink, useLocation } from "react-router-dom"

export const TableNavigation = () => {
  const { pathname } = useLocation()
  
  const links = [
    { id: 0, to: "/tables/pending", title: "Pending" },
    { id: 1, to: "/tables/inWork", title: "In work" },
    { id: 2, to: "/tables/completed", title: "Completed" },
    { id: 3, to: "/tables/declined", title: "Declined" }
  ]
  return (
    <div className="tableNavigator-wrapper">
      {links.map(link => (
        <NavLink key={link.id} to={link.to} style={{ color: link.to === pathname ? "black" : "gray" }}>
          {link.title}
        </NavLink>
      ))}
    </div>
  )
}