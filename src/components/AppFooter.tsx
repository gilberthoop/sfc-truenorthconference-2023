interface FooterProps {
  info: string;
}

const AppFooter: React.FC<FooterProps> = ({ info }) => {
  return (
    <footer className="app-footer">
      <div>
        <h1 className="app-footer__heading">{info}</h1>
      </div>
    </footer>
  );
};

export default AppFooter;
