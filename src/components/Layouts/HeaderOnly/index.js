import Header from "~/components/Layouts/components/Header";

function HeaderOnly({ children }) {
  return (
    <div>
      <Header />
      <div className="container" style={{ paddingTop: '65px' }} >
        <div className="contents">{children}</div>
      </div>
    </div>
  );
}

export default HeaderOnly;
