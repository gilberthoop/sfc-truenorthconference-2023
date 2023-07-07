interface FooterProps {
  info: string;
}

function AppFooter({ info }: FooterProps) {
  return (
    <footer className="app-footer">
      <div>
        <h1 className="app-footer__heading">{info}</h1>
      </div>
    </footer>
  );
}

export default AppFooter;
