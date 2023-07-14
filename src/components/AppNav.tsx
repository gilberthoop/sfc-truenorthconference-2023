import { NavigationInfo } from "@/utils/types";

interface AppNavProps {
  menuItems?: NavigationInfo[];
  firstCtaTitle?: string;
  onFirstCTAClick?: () => void;
  secondCtaTitle?: string;
  onSecondCTAclick?: () => void;
}

const AppNav: React.FC<AppNavProps> = ({
  menuItems,
  firstCtaTitle,
  onFirstCTAClick,
  secondCtaTitle,
  onSecondCTAclick,
}) => {
  function handleFirstCTAClick(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (onFirstCTAClick) {
      onFirstCTAClick();
    }
  }

  function handleSecondCTAClick(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (onSecondCTAclick) {
      onSecondCTAclick();
    }
  }

  const renderedNavAllDevices = (
    <div className="app-nav--alldevice">
      {firstCtaTitle && (
        <button onClick={handleFirstCTAClick} className="app-nav__cta">
          {firstCtaTitle}
        </button>
      )}
      {secondCtaTitle && (
        <button
          onClick={handleSecondCTAClick}
          className="cursor-pointer app-nav__cta"
        >
          {secondCtaTitle}
        </button>
      )}
    </div>
  );

  return <nav className="app-nav">{renderedNavAllDevices}</nav>;
};

export default AppNav;
