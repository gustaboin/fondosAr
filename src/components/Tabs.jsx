import './../styles/tabs.css';

function Tabs({ options, value, onChange })
{
    return (
        <div className="tabs">
            {options.map((opt) => (
                <button
                    key={opt.value}
                    className={`tab ${value === opt.value ? "active" : ""}`}
                    onClick={() => onChange(opt.value)}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    );
}

export default Tabs;