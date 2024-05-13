function transform() {
    var inputText = document.getElementById("input").value;
    var transformedText = "";
    var variables = {};
    var duplicateVariables = false;
    var duplicatedNames = {}; // To keep track of duplicate variable names

    // Split input into lines
    var lines = inputText.split('\n');

    // Process each line
    lines.forEach(line => {
        // Ignore lines starting with '#'
        if (!line.startsWith('#')) {
            var parts = line.split('=');
            if (parts.length === 2) {
                var varName = parts[0].replace(/%[^.]*\./, '').replace(/\./g, '_').replace(/-/g, '_').replace(/quarkus_/g, 'QUARKUS_').toUpperCase();
                var value = parts[1].trim();
                
                // Check if variable with the same name already exists
                if (variables.hasOwnProperty(varName)) {
                    // Check if the value is the same
                    if (variables[varName] !== value) {
                        // If values are different, notify the user
                        duplicateVariables = true;
                    } else {
                        // If values are the same, notify the user and mark as duplicated
                        duplicatedNames[varName] = value;
                        duplicateVariables = true;
                    }
                }

                // Store variable and value
                variables[varName] = value;

                transformedText += `${varName}: ${value}\n`;
            }
        }
    });

    // Display transformed variables
    var outputText = "";
    for (var name in variables) {
        if (!duplicatedNames.hasOwnProperty(name)) {
            outputText += `${name}: ${variables[name]}\n`;
        }
    }

    for (var name in duplicatedNames) {
        outputText += `${name}: ${duplicatedNames[name]}\n`;
    }

    document.getElementById("output").innerText = outputText;

    // Display message if duplicate variables were found
    var messageDiv = document.getElementById("message");
    if (duplicateVariables) {
        // Construct message with variable names
        var duplicateNamesString = Object.keys(duplicatedNames).join(",\n"); // Add line break after each variable name
        messageDiv.innerHTML = `<center><b>Variables declared multiple times and removed:</b></center> <br>${duplicateNamesString}) `;
    } else {
        messageDiv.innerText = ""; // Clear the message
    }
}


function sortVariables() {
    var outputText = document.getElementById("output").innerText;
    var lines = outputText.split('\n');
    lines.sort();
    document.getElementById("output").innerText = lines.join('\n');
}

function sortInput() {
    var inputText = document.getElementById("input").value;
    var lines = inputText.split('\n');
    lines.sort();
    document.getElementById("input").value = lines.join('\n');
}
