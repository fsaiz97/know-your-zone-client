import InnerNavTab from "../InnerNavTab";

const InnerNav = () => {
  return (
    <div className="inner-nav-container">
      <nav className="tab-container">
        <InnerNavTab
          page={"Summary"}
          routeName={"/borough/summary"}
          activeState={true}
        />
        <InnerNavTab
          page={"Rent Prices"}
          routeName={"/borough/rent"}
          activeState={false}
        />
        <InnerNavTab
          page={"Crime"}
          routeName={"/borough/crime"}
          activeState={false}
        />
        <InnerNavTab
          page={"Wellbeing"}
          routeName={"/borough/wellbeing"}
          activeState={false}
        />
        <InnerNavTab
          page={"Demographics"}
          routeName={"/borough/demographics"}
          activeState={false}
        />
      </nav>
    </div>
  );
};

export default InnerNav;
