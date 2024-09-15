// Color variables
const grey = "#f2f2f2"
const red = "#dc5e5766"
const blue = "#6a74ef66"
const yellow = "#d5a31966"
const green = "#6dad8966"

const Row = (course) => {

	/* determining colors associated with course stats */

    let course_quality_text = ""
    let course_color = grey

    if (course["course_quality"] == null){
        course_quality_text = "N/A"
    } else {
        course_quality_text = course["course_quality"].toString()
        course_color = blue
        if (course["course_quality"] < 1){
            course_color = red
        } else if (course["course_quality"] < 2){
            course_color = yellow
        } else if (course["course_quality"] < 3){
            course_color = green
        }
    }

    let instructor_quality_text = ""
    let instructor_color = grey
    if (course["instructor_quality"] == null){
        instructor_quality_text = "N/A"
    } else {
        instructor_quality_text = course["instructor_quality"].toString()
        instructor_color = blue
        if (course["instructor_quality"] < 1){
            instructor_color = red
        } else if (course["instructor_quality"] < 2){
            instructor_color = yellow
        } else if (course["instructor_quality"] < 3){
            instructor_color = green
        }
    }

    let diff_text = ""
    let diff_color = grey
    if (course["difficulty"] == null){
        diff_text = "N/A"
    } else {
        diff_text = course["difficulty"].toString()
        diff_color = red
        if (course["difficulty"] < 1){
            diff_color = blue
        } else if (course["difficulty"] < 2){
            diff_color = green
        } else if (course["difficulty"] < 3){
            diff_color = yellow
        }
    }

    let work_text = ""
    let work_color = grey
    if (course["work_required"] == null){
        work_text = "N/A"
    } else {
        work_text = course["work_required"].toString()
        work_color = red
        if (course["work_required"] < 1){
            work_color = blue
        } else if (course["work_required"] < 2){
            work_color = green
        } else if (course["work_required"] < 3){
            work_color = yellow
        }
    }

	/* saving colors */

    let active = {...course}
    active["course_color"] = course_color
    active["instructor_color"] = instructor_color
    active["diff_color"] = diff_color
    active["work_color"] = work_color
    

	/* returning organized row */
    
    return <>
        <div className="table-row" onClick={()=>{course["update"]({...active})}}>
            <div className="cell cell-id">{course["id"]}</div>
            <div className="cell cell-title">{course["title"]}</div>
            <div className="cell cell-num">{course["credits"]}</div>
            <div className="cell cell-num" style={{"backgroundColor": course_color}}>{course_quality_text}</div>
            <div className="cell cell-num" style={{"backgroundColor": instructor_color}}>{instructor_quality_text}</div>
            <div className="cell cell-num" style={{"backgroundColor": diff_color}}>{diff_text}</div>
            <div className="cell cell-num" style={{"backgroundColor": work_color}}>{work_text}</div>
        </div>
    </>

}

export default Row