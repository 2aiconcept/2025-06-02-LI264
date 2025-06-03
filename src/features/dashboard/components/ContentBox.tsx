interface ContentBoxProps {
  title?: string;
  children: React.ReactNode;
}

const ContentBox = ({ title, children }: ContentBoxProps) => {
  return (
    <div className="card mt-3 shadow-sm border-secondary">
      {/* Afficher le titre seulement s'il est fourni */}
      {title && (
        <div className="card-header bg-secondary text-white">{title}</div>
      )}
      <div className="card-body">
        {/* 3. Rendre la prop 'children' ici */}
        {children}
      </div>
    </div>
  );
};

export default ContentBox;
