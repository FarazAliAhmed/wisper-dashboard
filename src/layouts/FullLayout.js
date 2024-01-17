import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "reactstrap";

const FullLayout = ({ children }) => {
  return (
    <main>
      <div className="pageWrapper d-lg-flex">
        {/********Sidebar**********/}
        <aside
          style={{ zIndex: 9999 }}
          className="sidebarArea shadow"
          id="sidebarArea"
        >
          <Sidebar />
        </aside>
        {/********Content Area**********/}

        <div className="contentArea">
          {/********header**********/}
          <Header />
          {/********Middle Content**********/}
          <Container className="p-4 wrapper" fluid>
            {children}
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
