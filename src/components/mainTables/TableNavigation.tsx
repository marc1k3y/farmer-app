import { NavLink } from "react-router-dom"

export const TableNavigation = () => {
  const links = [
    { id: 0, to: "/tables/pending", title: "Pending" },
    { id: 1, to: "/tables/inWork", title: "In work" },
    { id: 2, to: "/tables/completed", title: "Completed" },
    { id: 3, to: "/tables/declined", title: "Declined" }
  ]
  return (
    <div>
      {links.map(link => (
        <NavLink key={link.id} to={link.to}>
          {link.title}
        </NavLink>
      ))}
    </div>
  )
}