import "./AnalysisIntroduction.css"

const AnalysisIntroduction = () => {
    return (
        <div className="analysis-intro">
            <h2>Introduction</h2>
            <p>
            We are going to analyze the headquarters of S&amp;P 500 companies. In this project, we aim to understand how clustered or evenly distributed the companies are.
            </p>
            <p>
            Looking at the map, you can see that some areas, like Silicon Valley or New York, have clear clusters of companies, while other regions, such as much of the western US, appear more uniformly distributed on a macro scale.
            </p>
            <p>
            To quantify clustering or uniformity, we use <strong>Moran’s I</strong>. Moran’s I measures how clustered or dispersed a dataset is. Its value ranges from -1 to 1: a negative value indicates a dispersed (uniform) pattern, a positive value indicates a clustered pattern, and a value close to zero indicates a random pattern.
            </p>
            <p>
            For this analysis, we use queen contiguity to construct the neighbor matrix, as it provides a comprehensive view of neighboring relationships between regions.
            </p>
            <p>
            <strong>Note: </strong> Alaska, Hawaii, and the District of Columbia are not included in the table or neighbor matrix. Alaska and Hawaii are not contiguous with the mainland United States, making neighbor definitions (queen/rook contiguity) impractical. District of Columbia is very small and has only a few neighbors, which could distort the calculation.
            </p>
        </div>
    );
}

export default AnalysisIntroduction;