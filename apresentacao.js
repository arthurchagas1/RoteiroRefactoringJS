const formatarMoeda = require("./util");

module.exports = function gerarFaturaStr(fatura, calc) {
  let resultado = `Fatura ${fatura.cliente}\n`;

  for (let apre of fatura.apresentacoes) {
    resultado += `  ${calc.repo.getPeca(apre).nome}: ${formatarMoeda(calc.calcularTotalApresentacao(apre))} (${apre.audiencia} assentos)\n`;
  }

  resultado += `Valor total: ${formatarMoeda(calc.calcularTotalFatura(fatura.apresentacoes))}\n`;
  resultado += `Créditos acumulados: ${calc.calcularTotalCreditos(fatura.apresentacoes)} \n`;
  return resultado;
}
