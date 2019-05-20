let titleId = "landing-title";
let titles = ["Software Developer", "Physicist", "Problem Solver"];

function getElById(id) {
    let el = document.getElementById(id);
    if (!el) {
        throw new ReferenceError(id + " is not defined");
    }
    return el;
}

function deleteText(id, delay) {
    let el = getElById(id);
    let length = el.innerText.length;

    let i = setInterval(() => {
        el.innerText = el.innerText.substr(0, --length) + '|';

        if (length === 0) {
            clearInterval(i);
        }
    }, delay)
}

function writeText(id, text, delay) {
    let el = getElById(id);
    let length = 0;

    let i = setInterval(() => {
        el.innerText = text.substr(0, ++length) + '|';

        if (length === text.length) {
            clearInterval(i);
        }
    }, delay)
}

function blinkCursor(id) {
    let el = getElById(id);
    let delay = 530;
    let cursor;
    let length;

    setInterval(() => {
        length = el.innerText.length
        cursor = el.innerText.substr(length - 1, 1);
        cursor = cursor === '|' ? '\u2008' : '|';

        el.innerText = el.innerText.substr(0, length - 1) + cursor;
    }, delay)
}

function cycleText(id, texts, charDelay, stringDelay) {
    let el = document.getElementById(id);
    let timeout = 0;

    el.innerText = texts[0] + '|';

    for (let i = 1; i < texts.length; i++) {
        timeout += stringDelay;
        setTimeout(() => deleteText(id, charDelay), timeout);

        timeout += stringDelay + texts[i - 1].length * charDelay;
        setTimeout(() => writeText(id, texts[i], charDelay), timeout);

        timeout += texts[i].length * charDelay;
    }

    blinkCursor(id);
}

cycleText(titleId, titles, 120, 2000);