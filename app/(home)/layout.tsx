import { HomeLayout } from "@/modules/layouts/layout"

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({children}:LayoutProps) => {
  return (
    <HomeLayout>
      {children}
    </HomeLayout>
  )
}

export default Layout