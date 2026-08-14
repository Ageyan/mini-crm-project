interface DashCardProps {
    label: string;
    value: string | number;
    desc: string;
    progress?: number;
}

const DashCard = ({ label, value, desc, progress }: DashCardProps) => {
    return (
        <div className="dash-card">
            <h3 className="dash-card__label">{label}</h3>
            <div className="dash-card__content">
                <span className="dash-card__number">
                    {value}
                    {progress !== undefined ? '%' : ''}
                </span>
                {progress !== undefined && (
                    <div className="dash-card__progress-bar">
                        <div
                            className="dash-card__progress-fill"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                )}
                <p className="dash-card__desc">{desc}</p>
            </div>
        </div>
    );
};

export default DashCard;
