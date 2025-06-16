function gerarFaturaStr(fatura, pecas) {

  function getPeca(apre) {
    return pecas[apre.id];
  }

  function calcularTotalApresentacao(apre) {
    let total = 0;
    switch (getPeca(apre).tipo) {
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
        throw new Error(`Tipo desconhecido: ${getPeca(apre).tipo}`);
    }
    return total;
  }

  function calcularCredito(apre) {
    let creditos = 0;
    creditos += Math.max(apre.audiencia - 30, 0);
    if (getPeca(apre).tipo === "comedia") creditos += Math.floor(apre.audiencia / 5);
    return creditos;
  }

  function formatarMoeda(valor) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency", currency: "BRL", minimumFractionDigits: 2
    }).format(valor / 100);
  }

  let totalFatura = 0;
  let creditos = 0;
  let resultado = `Fatura ${fatura.cliente}\n`;

  for (let apre of fatura.apresentacoes) {
    let total = calcularTotalApresentacao(apre);
    creditos += calcularCredito(apre);

    resultado += `  ${getPeca(apre).nome}: ${formatarMoeda(total)} (${apre.audiencia} assentos)\n`;
    totalFatura += total;
  }

  resultado += `Valor total: ${formatarMoeda(totalFatura)}\n`;
  resultado += `Créditos acumulados: ${creditos} \n`;
  return resultado;
}
