const AppFooterSecondary: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const facebook = "https://www.facebook.com/cfcsfccanada/";
  const instagram = "https://www.instagram.com/cfcsfccanada/";
  const linkTree = "https://linktr.ee/cfcsfccanada";

  return (
    <footer className="app-footer--secondary">
      <section className="app-footer--secondary__body1">
        <span>CFC-Singles for Christ Canada &copy; {currentYear}</span>
      </section>
      <section className="app-footer--secondary__body2">
        <span>
          <a href={facebook} target="_blank">
            Facebook
          </a>
        </span>
        <span>
          <a href={instagram} target="_blank">
            Instagram
          </a>
        </span>
        <span>
          <a href={linkTree} target="_blank">
            LinkTree
          </a>
        </span>
      </section>
    </footer>
  );
};

export default AppFooterSecondary;
