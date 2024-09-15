/* component for rows of cart contents in receipt */

const SectionRow = (section) => {
        
    return <>
        <div className="table-row sections-row no-hover" style={{textAlign: "center"}}>
            <div className="cell medium">{section["section_id"]}</div>
            <div className="cell cell-num">{section["activity"]}</div>
            <div className="cell large">{section["instructor"]}</div>
            <div className="cell cell-num">{section["credits"]}</div>
            <div className="cell cell-num">{section["days"]}</div> 
            <div className="cell cell-num">{section["start"]}</div> 
            <div className="cell cell-num">{section["end"]}</div> 
            <div className="cell cell-num" style={{backgroundColor: section["course_color"]}}>{section["course_quality"]}</div>
            <div className="cell cell-num" style={{backgroundColor: section["instructor_color"]}}>{section["instructor_quality"]}</div>
            <div className="cell cell-num" style={{backgroundColor: section["diff_color"]}}>{section["difficulty"]}</div>
            <div className="cell cell-num" style={{backgroundColor: section["work_color"]}}>{section["work_required"]}</div> 
        </div>
    </>

}

export default SectionRow