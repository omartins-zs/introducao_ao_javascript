// escopo global
const escopoGlobal = "Visível em todo o arquivo";
console.log("Escopo global:", escopoGlobal);

{
  // escopo de bloco
  const escopoBloco = "Visível apenas dentro deste bloco";
  console.log("Escopo de bloco:", escopoBloco);
}

function test() {
  // escopo de função
  const escopoFuncao = "Visível apenas dentro da função test()";
  console.log("Escopo de função:", escopoFuncao);
}

test();
