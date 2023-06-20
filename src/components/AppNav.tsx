import { NavigationInfo } from "@/utils/types";

interface AppNavProps {
  menuItems?: NavigationInfo[];
  ctaTitle: string;
  onCTAClick: () => void;
  onExtraCTAclick?: () => void;
  extraCTAtitle?: string;
}

function AppNav({
  menuItems,
  ctaTitle,
  onCTAClick,
  onExtraCTAclick,
  extraCTAtitle,
}: AppNavProps) {
  const renderedMenuItems = (
    <section className="app-nav__menu">
      {menuItems &&
        menuItems.map((menuItem, index) => (
          <a key={index} href={menuItem.href} className="cursor-pointer">
            {menuItem.name}
          </a>
        ))}
      {extraCTAtitle && (
        <button onClick={handleExtraCTAClick} className="cursor-pointer">
          {extraCTAtitle}
        </button>
      )}
    </section>
  );

  function handleCTAClick(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    onCTAClick();
  }

  function handleExtraCTAClick(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (onExtraCTAclick) {
      onExtraCTAclick();
    }
  }

  const renderedNavDesktop = (
    <div className="app-nav--desktop">
      {renderedMenuItems}
      <button onClick={handleCTAClick} className="app-nav__cta">
        {ctaTitle}
      </button>
    </div>
  );

  const renderedNavMobile = (
    <div className="app-nav--mobile">
      <button onClick={handleCTAClick} className="app-nav__cta">
        {ctaTitle}
      </button>
      {extraCTAtitle && (
        <button
          onClick={handleExtraCTAClick}
          className="cursor-pointer app-nav__cta"
        >
          {extraCTAtitle}
        </button>
      )}
    </div>
  );

  const renderedNavAllDevices = (
    <div className="app-nav--alldevice">
      <button onClick={handleCTAClick} className="app-nav__cta">
        {ctaTitle}
      </button>
      {extraCTAtitle && (
        <button
          onClick={handleExtraCTAClick}
          className="cursor-pointer app-nav__cta"
        >
          {extraCTAtitle}
        </button>
      )}
    </div>
  );

  return <nav className="app-nav">{renderedNavAllDevices}</nav>;
}

export default AppNav;
