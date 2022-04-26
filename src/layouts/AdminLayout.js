import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "reactstrap";
import { useUser } from '../context/userContext'

const AdminLayout = ({ children }) => {
  const { user } = useUser()
  return (
    <main>
      <div className="pageWrapper d-lg-flex">
        {/********Sidebar**********/}
        <aside className="sidebarArea shadow" id="sidebarArea">
          <Sidebar isAdmin={user.isAdmin}/>
        </aside>
        {/********Content Area**********/}

        <div className="contentArea">
          {/********header**********/}
          <Header isAdmin={user.isAdmin} />
          {/********Middle Content**********/}
          <Container className="p-4 wrapper" fluid>
            {children}
          </Container>
        </div>
      </div>
    </main>
  );
};

export default AdminLayout;
