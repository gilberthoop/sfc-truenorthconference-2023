interface FooterProps {
  info: string;
  onCtaClick?: () => void;
}

const AppFooter: React.FC<FooterProps> = ({ info, onCtaClick }) => {
  return (
    <footer className="app-footer">
      <div className="app-footer__heading">
        <h1>{info}</h1>
        {onCtaClick && <button onClick={onCtaClick}>SFC TNC Video Memo</button>}
      </div>
    </footer>
  );
};

export default AppFooter;
