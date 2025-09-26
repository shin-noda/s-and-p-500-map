import "./AnalysisConclusion.css"

const AnalysisConclusion = () => {
    return (
        <div className="analysis-conclusion">
            <h2>Conclusion</h2>
            <p>
                We calculated Moran's I to determine whether the distribution of the headquarters of S&P 500 companies is uniform, clustered, or random.<br/>
                We obtained a Moran's I value of 0.005, which is very close to 0. Therefore, the spatial distribution is essentially random.<br/>
                <br/>
                This means that even though we can observe clustered patterns in Silicon Valley or New York, the overall distribution of companies across the United States is random. This may seem counterintuitive, but when looking at the big picture, it makes sense because there are both clustered and dispersed areas in the US, which effectively cancel each other out.
            </p>
        </div>
    );
}

export default AnalysisConclusion;