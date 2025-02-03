let entradas = 0, saidas = 0;
function atualizarTotais() {
    document.getElementById('entradas').textContent = entradas.toFixed(2);
    document.getElementById('saidas').textContent = saidas.toFixed(2);
    document.getElementById('total').textContent = (entradas - saidas).toFixed(2);
}
function adicionar() {
    let descricao = document.getElementById('descricao').value;
    let valor = parseFloat(document.getElementById('valor').value);
    let tipo = document.getElementById('tipo').value;
    if (!descricao || isNaN(valor)) return;

    let tabela = document.getElementById('tabela');
    let row = tabela.insertRow();
    row.innerHTML = `<td>${descricao}</td><td>R$ ${valor.toFixed(2)}</td>
            <td class="${tipo}">${tipo === 'entrada' ? '⬆️' : '⬇️'}</td>
            <td><button onclick="remover(this, ${valor}, '${tipo}')">🗑️</button></td>`;

    if (tipo === 'entrada') entradas += valor;
    else saidas += valor;

    atualizarTotais();
    document.getElementById('descricao').value = '';
    document.getElementById('valor').value = '';
}

function remover(botao, valor, tipo) {
    let row = botao.parentNode.parentNode;
    row.remove();
    if (tipo === 'entrada') entradas -= valor;
    else saidas -= valor;
    atualizarTotais();
}
function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("Relatório Financeiro", 10, 10);
    doc.text(`Entradas: R$ ${entradas.toFixed(2)}`, 10, 20);
    doc.text(`Saídas: R$ ${saidas.toFixed(2)}`, 10, 30);
    doc.text(`Total: R$ ${(entradas - saidas).toFixed(2)}`, 10, 40);

    let tabela = document.getElementById('tabela').rows;
    let y = 50;
    doc.text("Descrição - Valor - Tipo", 10, y);
    y += 10;

    for (let row of tabela) {
        let descricao = row.cells[0].textContent;
        let valor = row.cells[1].textContent;
        let tipo = row.cells[2].textContent;
        doc.text(`${descricao} - ${valor} - ${tipo}`, 10, y);
    y += 10;
}

        doc.save("Controle_Financeiro.pdf");
}