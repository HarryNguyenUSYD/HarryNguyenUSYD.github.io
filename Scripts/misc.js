function copyToClipboard(text) {
    navigator.clipboard.writeText(text);

    let alert = document.createElement('div');
    let textNode = document.createTextNode("Copied to clipboard!");

    alert.appendChild(textNode);

    alert.style.cssText = `
        position: fixed;
        width: 250px;
        height: 50px;
        right: 50px;
        bottom: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        background-color: red;
        color: #fff;
        font-size: 20px;
        border-radius: 20px;
        z-index: 999;
    `;

    document.body.appendChild(alert);

    setTimeout(() => {
        document.body.removeChild(alert);
    }, 2000);
}