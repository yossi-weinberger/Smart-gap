export function LoaderBar({ progress }) {

    return (
        <div className="loader-bar">
            <div style={{ marginTop: '1rem', width: '100%', background: '#eee', height: '8px', borderRadius: '4px' }}>
                <div
                    style={{
                        width: `${progress}%`,
                        height: '100%',
                        backgroundColor: '#4caf50', // green
                        transition: 'width 0.3s ease',
                        borderRadius: '4px',
                    }}
                />
            </div>

            <p className="rlt">העלאת הקבצים מתבצעת...</p>
        </div>
    )
}