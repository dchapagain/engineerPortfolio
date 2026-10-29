export { Contact } from './Contact'
export { Experience } from './Experience'
export { Hero } from './Hero'
export { Nav } from './Navbar'
export { Principle } from './Principle'
// Skills is not re-exported: App imports it lazily by path, and routing it
// through this barrel would pull it back into the eager graph.
export { Work } from './Work'
