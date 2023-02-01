export const LabelComponent = ({ labels }) => {
    return (
        <>
            {
                labels.map((labelOption, index) => {
                    const { label, className } = labelOption;
                    return (<div key={index} className="labelcontainer">
                        <div className={className} />
                        <p>{label}</p>
                    </div>)
                })
            }
        </>
    )
}