
const display = document.getElementById('display');
const inputA = document.getElementById('a');
const inputB = document.getElementById('b');
const inputC = document.getElementById('c');
const resultadoBhaskara = document.getElementById('resultado');
const passosBhaskaraDiv = document.getElementById('passosBhaskara');
let lastInput = '';

function add(valor) {
    display.value += valor;
    lastInput = valor;
}

function clearDisplay() {
    display.value = '';
    lastInput = '';
}

function calcular() {
    try {
        display.value = eval(display.value);
        lastInput = display.value;
    } catch (e) {
        display.value = 'Essa conta não deu pra fazer!';
        lastInput = '';
    }
}

function handleSqrt() {
    if (!isNaN(parseFloat(display.value))) {
        const numero = parseFloat(display.value);
        display.value = `√${numero}`;
        try {
            display.value = Math.sqrt(numero);
            lastInput = display.value;
        } catch (e) {
            display.value = 'Só consigo raiz quadrada de número positivo!';
            lastInput = '';
        }
    } else if (lastInput && !isNaN(parseFloat(lastInput))) {
        const numero = parseFloat(lastInput);
        display.value += '√' + numero;
        try {
            display.value = Math.sqrt(numero);
            lastInput = display.value;
        } catch (e) {
            display.value = 'Só consigo raiz quadrada de número positivo!';
            lastInput = '';
        }
    } else {
        display.value = 'Coloca um número antes de pedir a raiz!';
    }
}

document.addEventListener('keydown', (e) => {
    const teclasPermitidas = '0123456789+-*/().';
    if (teclasPermitidas.includes(e.key) && document.activeElement !== inputA && document.activeElement !== inputB && document.activeElement !== inputC) {
        display.value += e.key;
        lastInput = e.key;
    }
    if (e.key === 'Enter') {
        calcular();
    }
    if (e.key === 'Backspace' && document.activeElement !== inputA && document.activeElement !== inputB && document.activeElement !== inputC) {
        display.value = display.value.slice(0, -1);
        lastInput = display.value.slice(-1);
    }
});

function atualizarBhaskara(a, b, c, delta) {
    let passos = '';

    if (!isNaN(a) && !isNaN(b) && !isNaN(c)) {
        passos += `<p>A nossa fórmula mágica do <span class="destaque">Delta</span> (<span class="math-inline">$\\Delta$</span>) é:</p>`;
        passos += `<p class="formula"><span class="math-inline">$\\Delta = b^2 - 4ac$</span></p>`;
        passos += `<p>Agora, vamos colocar os números no lugar das letras:</p>`;
        passos += `<p class="calculo-linha"><span class="math-inline">$\\Delta = (${b})^2 - 4 \times (${a}) \times (${c})$</span></p>`;
        passos += `<p>Primeiro, calculamos o <span class="destaque">${b}</span> ao quadrado, que é <span class="destaque">${b} \times ${b} = ${b * b}</span>:</p>`;
        passos += `<p class="calculo-linha"><span class="math-inline">$\\Delta = ${b * b} - 4 \times (${a}) \times (${c})$</span></p>`;
        passos += `<p>Agora, vamos multiplicar o <span class="math-inline">-4</span> pelo <span class="destaque">${a}</span>, que dá <span class="destaque">${-4 * a}</span>:</p>`;
        passos += `<p class="calculo-linha"><span class="math-inline">$\\Delta = ${b * b} + (${-4 * a}) \times (${c})$</span></p>`;
        passos += `<p>E agora, multiplicamos o resultado anterior pelo <span class="destaque">${c}</span>, que dá <span class="destaque">${-4 * a * c}</span>:</p>`;
        passos += `<p class="calculo-linha"><span class="math-inline">$\\Delta = ${b * b} + (${-4 * a * c})$</span></p>`;
        const deltaCalculado = b * b - 4 * a * c;
        passos += `<p>Finalmente, somamos (ou subtraímos) tudo para encontrar o Delta: <span class="math-inline">$\\Delta = <span class="destaque">${deltaCalculado.toFixed(2)}</span>$</span></p><br>`;

        if (deltaCalculado < 0) {
            passos += `<p>Vixe! O Delta (<span class="destaque">${deltaCalculado.toFixed(2)}</span>) é menor que zero. Isso quer dizer que não temos respostas com números normais! 😔</p>`;
            resultadoBhaskara.textContent = `Delta = ${deltaCalculado.toFixed(2)}`;
        } else if (deltaCalculado === 0) {
            passos += `<p>Que legal! O Delta deu zero! 🎉 Isso significa que temos uma resposta só!</p>`;
            passos += `<p>Para achar essa resposta, usamos a fórmula:</p>`;
            passos += `<p class="formula"><span class="math-inline">$x = \\frac{-b}{2a}$</span></p>`;
            passos += `<p>Colocando os números: <span class="math-inline">$x = \\frac{-(${b})}{2 \times (${a})} = <span class="destaque">${(-b / (2 * a)).toFixed(2)}</span>$</span></p>`;
            resultadoBhaskara.textContent = `x = ${(-b / (2 * a)).toFixed(2)}`;
        } else {
            passos += `<p>Oba! O Delta (<span class="destaque">${deltaCalculado.toFixed(2)}</span>) é maior que zero! Vamos ter duas respostas!</p>`;
            passos += `<p>Usando a fórmula: <span class="math-inline">$x = \\frac{-b \pm \sqrt{\\Delta}}{2a}$</span></p>`;
            const x1 = (-b + Math.sqrt(deltaCalculado)) / (2 * a);
            const x2 = (-b - Math.sqrt(deltaCalculado)) / (2 * a);
            passos += `<p>Primeira resposta (com o +): <span class="math-inline">$x_1 = \\frac{-(${b}) + \sqrt{${deltaCalculado.toFixed(2)}}}{2 \times (${a})} = <span class="destaque">${x1.toFixed(2)}</span>$</span></p>`;
            passos += `<p>Segunda resposta (com o -): <span class="math-inline">$x_2 = \\frac{-(${b}) - \sqrt{${deltaCalculado.toFixed(2)}}}{2 \times (${a})} = <span class="destaque">${x2.toFixed(2)}</span>$</span></p>`;
            resultadoBhaskara.textContent = `x₁ = ${x1.toFixed(2)}, x₂ = ${x2.toFixed(2)}`;
        }
    } else {
        passos = '<p>Pra começar a calcular, digita os valores de <span class="destaque">a</span>, <span class="destaque">b</span> e <span class="destaque">c</span>!</p>';
        resultadoBhaskara.textContent = 'Preencha os valores de a, b e c.';
    }

    passosBhaskaraDiv.innerHTML = passos;
}

function calcularBhaskara() {
    const a = parseFloat(inputA.value);
    const b = parseFloat(inputB.value);
    const c = parseFloat(inputC.value);
    const delta = b * b - 4 * a * c;

    atualizarBhaskara(a, b, c, delta);
}

atualizarBhaskara(parseFloat(inputA.value), parseFloat(inputB.value), parseFloat(inputC.value), NaN);