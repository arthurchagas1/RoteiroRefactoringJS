function gerarFaturaStr(fatura, pecas) {

  function calcularTotalApresentacao(apre, peca) {
    let total = 0;
    switch (peca.tipo) {
      case "tragedia":
        total = 40000;
        if (apre.audiencia > 30) total += 1000 * (apre.audiencia - 30);
        break;
      case "comedia":
        total = 30000;
        if (apre.audiencia > 20) total += 10000 + 500 * (apre.audiencia - 20);
        total += 300 * apre.audiencia;
        break;
      default:
        throw new Error(`Tipo desconhecido: ${peca.tipo}`);
    }
    return total;
  }

  let totalFatura = 0;
  let creditos = 0;
  let resultado = `Fatura ${fatura.cliente}\n`;

  for (let apre of fatura.apresentacoes) {
    const peca = pecas[apre.id];
    let total = calcularTotalApresentacao(apre, peca);

    creditos += Math.max(apre.audiencia - 30, 0);
    if (peca.tipo === "comedia") creditos += Math.floor(apre.audiencia / 5);

    resultado += `  ${peca.nome}: R$ ${(total / 100).toFixed(2)} (${apre.audiencia} assentos)\n`;
    totalFatura += total;
  }

  resultado += `Valor total: R$ ${(totalFatura / 100).toFixed(2)}\n`;
  resultado += `Créditos acumulados: ${creditos} \n`;
  return resultado;
}
