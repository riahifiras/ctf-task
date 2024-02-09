function decryptMessage(encryptedMessage) {
    let decryptedMessage = '';
    const shift = 3;

    for (let i = 0; i < encryptedMessage.length; i++) {
        let charCode = encryptedMessage.charCodeAt(i);
        if (charCode >= 97 && charCode <= 122) {
            charCode = ((charCode - 97 - shift + 26) % 26) + 97;
        }
        decryptedMessage += String.fromCharCode(charCode);
    }

    return decryptedMessage;
}

document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the final variable from localStorage
    const finalFromLocalStorage = localStorage.getItem('final');
    const yes = decryptMessage(finalFromLocalStorage);
    // Check if final contains any "#" characters
    const hasHash = yes && yes.includes('#') && yes.length === 14;

    // Select the element where you want to display the image or message
    const displayElement = document.querySelector('.info');

    if (hasHash != null && !hasHash) {
        // Display the image
        displayElement.innerHTML = '<img src="Untitled.png" alt="Image">';
    } else {
        // Show the message
        displayElement.innerHTML = "<h2>Arja3 kamel l quiz b s7i7 pls</h2>";
    }
});