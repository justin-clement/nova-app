function SubscriptionBadge({ subscription }) {

    const styling = {
        div: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "200px",
            maxWidth: "400px",
            padding: "1rem",
            borderRadius: "7px",
            border: "3px solid white",
            backgroundColor: subscription === "NOVA A" ? "#009c41" : "#2626be",
            color: "whitesmoke",
            fontFamily: "Geom",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            margin: "0 auto"
        }
    };

    return (
        <div style={styling.div} className="subscription-badge">
            <h2>{subscription}</h2>
        </div>
    )
};

export default SubscriptionBadge;