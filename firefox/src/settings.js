function saveConfigInStorage(user_identifier, user_matrix) {
    browser.storage.sync.set({
        d: {
            user_identifier,
            user_matrix,
        }
    });
}

async function loadConfigFromStorage() {
    return await browser.storage.sync.get("d");
}

function prepareMatrixInputs(matrix_lines) {
    if (!Array.isArray(matrix_lines) || matrix_lines.length !== 7)
        return null;
    let concatenated_matrix = "";
    for (let line_index in matrix_lines) {
        if (matrix_lines[line_index].length !== 10)
            return null;
        concatenated_matrix += matrix_lines[line_index];
    }
    if (!/^[A-Z]{70}$/gm.test(concatenated_matrix))
        return null;
    return concatenated_matrix;
}

function saveConfig() {
    const username = document.querySelector("#username").value;
    const matrix_array = Array.from(Array(7).keys())
        .map(line_id => document.getElementById("matrix-l" + (line_id + 1)).value);
    const matrix_array_formatted = prepareMatrixInputs(matrix_array);
    if (!matrix_array_formatted)
        return console.log("Provided array is not in the valid format", matrix_array);
    saveConfigInStorage(username, matrix_array)
}

function restoreViewFromBackup() {
    loadConfigFromStorage().then(response => {
        if (typeof response?.d?.user_identifier === "string")
            document.querySelector("#username").value = response.d?.user_identifier;

        if (Array.isArray(response?.d?.user_matrix))
            for (let line_id = 1; line_id < 9; line_id++) {
                document.querySelector("#matrix-l" + line_id).value =
                    response?.d?.user_matrix[line_id - 1] || "";
            }
    })
}

document.addEventListener("DOMContentLoaded", restoreViewFromBackup);
document.getElementById("update").addEventListener("click", saveConfig);
