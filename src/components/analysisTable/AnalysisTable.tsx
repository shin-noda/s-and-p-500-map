import DisplayTable from "../displayTable/DisplayTable";

const AnalysisTable = () => {
    return (
        <div className="analysis-table">
            <h2 className="analysis-subtitle">How many headquarters are there in each state?</h2>
            <p>
            First, we are going to count how many headquarters are in each state.
            </p>
            <p>
            <strong>Note: </strong> Companies such as Lululemon have headquarters in Canada, so they are not included.
            </p>
            <DisplayTable />
        </div>
    );
}

export default AnalysisTable;