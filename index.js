class ServicoCalculoFatura {
  calcularTotalApresentacao(pecas, apre) {
    let total = 0;
    switch (this.getPeca(pecas, apre).tipo) {
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
        throw new Error(`Tipo desconhecido: ${this.getPeca(pecas, apre).tipo}`);
    }
    return total;
  }

  calcularCredito(pecas, apre) {
    let creditos = 0;
    creditos += Math.max(apre.audiencia - 30, 0);
    if (this.getPeca(pecas, apre).tipo === "comedia") creditos += Math.floor(apre.audiencia / 5);
    return creditos;
  }

  calcularTotalCreditos(pecas, apresentacoes) {
    let creditos = 0;
    for (let apre of apresentacoes) {
      creditos += this.calcularCredito(pecas, apre);
    }
    return creditos;
  }

  calcularTotalFatura(pecas, apresentacoes) {
    let total = 0;
    for (let apre of apresentacoes) {
      total += this.calcularTotalApresentacao(pecas, apre);
    }
    return total;
  }

  getPeca(pecas, apre) {
    return pecas[apre.id];
  }
}

function gerarFaturaStr(fatura, pecas, calc) {
  let resultado = `Fatura ${fatura.cliente}\n`;

  for (let apre of fatura.apresentacoes) {
    resultado += `  ${calc.getPeca(pecas, apre).nome}: ${formatarMoeda(calc.calcularTotalApresentacao(pecas, apre))} (${apre.audiencia} assentos)\n`;
  }

  resultado += `Valor total: ${formatarMoeda(calc.calcularTotalFatura(pecas, fatura.apresentacoes))}\n`;
  resultado += `Créditos acumulados: ${calc.calcularTotalCreditos(pecas, fatura.apresentacoes)} \n`;
  return resultado;
}
