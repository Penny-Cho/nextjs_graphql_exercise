const SpinningLoader = ({ variant = "normal" }) => (
    <div className={`sk-chase sk-chase-${variant}`}>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
        <div className="sk-chase-dot"></div>
    </div>
);

//from spinkit https://tobiasahlin.com/spinkit/

export default SpinningLoader;
