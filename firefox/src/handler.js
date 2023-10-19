async function loadConfigFromStorage() {
    return await browser.storage.sync.get("d");
}

async function getSavedUsername() {
    const last_config = await loadConfigFromStorage();
    return last_config?.d?.user_identifier || "";
}

async function getMatrixValue(row, col) {
    const last_config = await loadConfigFromStorage();
    const full_matrix = last_config?.d?.user_matrix;
    if (!Array.isArray(full_matrix) || full_matrix.length !== 7) {
        return "";
    }
    const line_matrix = full_matrix[row];
    if (typeof line_matrix !== "string" || line_matrix.length !== 10)
        return "";
    return line_matrix.slice(col, col + 1);
}

function convertLocInput(string_loc) {
    const match_result = [...string_loc.matchAll(/^\[([A-J]),([1-7])]$/g)]

    if (match_result.length !== 1 || match_result[0].length !== 3)
        return null;

    const col_string_value = match_result[0][1];
    const row_string_value = match_result[0][2];

    return {
        col: col_string_value.charCodeAt(0) - 65,
        row: parseInt(row_string_value, 10) - 1,
    }
}

function doActionForUsername() {
    const username_form = $("form * table tbody");
    if (username_form[0] && username_form[0].textContent
        .includes("Please input your account & password.")) {
        getSavedUsername().then((username) => {
            $("form * table * input[name=usr_name]")[0].value = username;
        })
    }
}

function doActionForMatrix() {
    const matrix_form = $("form tbody table[id=authentication] tr");
    if (matrix_form[0] && matrix_form[0].textContent
        .includes("Matrix Authentication")) {
        for (let matrix_index = 0; matrix_index < 3; matrix_index++) {
            const output_section = $(`table[id=authentication] input[name=message${matrix_index + 3}]`);
            const wrapper = output_section.parents().eq(3);
            const cell_location = wrapper.children(":first");
            const cell_value = cell_location[0].textContent;
            const loc = convertLocInput(cell_value);

            getMatrixValue(loc.row, loc.col).then((value) => {
                output_section[0].value = value;
            })
        }

    }
}

function doActionForCurrentContext() {
    doActionForUsername();
    doActionForMatrix();

}

doActionForCurrentContext()
