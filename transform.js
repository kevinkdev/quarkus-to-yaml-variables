function transform() {
    var inputText = document.getElementById("input").value;
    var transformedText = "";

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
                transformedText += varName + ": " + value + "\n";
            }
        }
    });

    // Display transformed variables
    document.getElementById("output").innerText = transformedText;
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
