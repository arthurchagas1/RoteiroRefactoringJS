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

  function calcularTotalFatura() {
    let total = 0;
    for (let apre of fatura.apresentacoes) {
      total += calcularTotalApresentacao(apre);
    }
    return total;
  }

  function calcularTotalCreditos() {
    let creditos = 0;
    for (let apre of fatura.apresentacoes) {
      creditos += calcularCredito(apre);
    }
    return creditos;
  }

  let resultado = `Fatura ${fatura.cliente}\n`;

  for (let apre of fatura.apresentacoes) {
    resultado += `  ${getPeca(apre).nome}: ${formatarMoeda(calcularTotalApresentacao(apre))} (${apre.audiencia} assentos)\n`;
  }

  resultado += `Valor total: ${formatarMoeda(calcularTotalFatura())}\n`;
  resultado += `Créditos acumulados: ${calcularTotalCreditos()} \n`;
  return resultado;
}
