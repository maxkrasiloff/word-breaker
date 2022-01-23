window.addEventListener('load', () => {
  document.getElementById('buttonFind').addEventListener('click', findAllSymbols);

});

const findAllSymbols = () => {
  const textArea = document.getElementById('filteredTextarea');
  const symbol1 = document.getElementById('s1').value.toLowerCase();
  const symbol2 = document.getElementById('s2').value.toLowerCase();
  const symbol3 = document.getElementById('s3').value.toLowerCase();
  const symbol4 = document.getElementById('s4').value.toLowerCase();
  const symbol5 = document.getElementById('s5').value.toLowerCase();
  const excludeSymbols = document.getElementById('excludeSymbols').value.toLowerCase().trim().split(' ');
  const includeSymbols = document.getElementById('includeSymbols').value.toLowerCase().trim().split(' ');
  const excludeSpecSymbols = document.getElementById('excludeSpecSymbols').checked;
  const excludeShorts = document.getElementById('excludeShorts').checked;
  const consonantsCount = +document.getElementById('consonants').value;
  const resultBlock = document.getElementById('resultBlock');
  let result = dataset;
  
  if (excludeShorts) {
    result = result.filter((word) => !(/^(.*[А-ЯЁ])$/.test(word)) );
  }

  if (excludeSpecSymbols) {
    const specSymbolsArray = ['.', ' ', '/'];
    specSymbolsArray.forEach((symbol) => {
      result = result.filter((word) => !(1 + word.indexOf(symbol)));
    })
  }

  if (includeSymbols.length) {
    includeSymbols.forEach((symbol) => {
      result = result.filter((word) => !symbol.length || 1 + word.toLowerCase().indexOf(symbol));
    })
  }

  if (excludeSymbols.length) {
    excludeSymbols.forEach((symbol) => {
      result = result.filter((word) => !symbol.length || !(1 + word.toLowerCase().indexOf(symbol)));
    })
  }

  if (symbol1) {
    result = result.filter( (word) => findSymbol(word, symbol1, 0));
  }
  if (symbol2) {
    result = result.filter( (word) => findSymbol(word, symbol2, 1));
  }
  if (symbol3) {
    result = result.filter( (word) => findSymbol(word, symbol3, 2));
  }
  if (symbol4) {
    result = result.filter( (word) => findSymbol(word, symbol4, 3));
  }
  if (symbol5) {
    result = result.filter( (word) => findSymbol(word, symbol5, 4));
  }

  if (consonantsCount) {
    consonantsArray = ['й', 'ц', 'к', 'н', 'г', 'ш','щ','з','х','ъ','ф','в','п','р','л','д','ж','ч','с','м','т','ь','б'];
    result = result.filter((word) => {
      wordConsonantsCounter = word.split('').reduce((prevValue, value) => {
        if (consonantsArray.indexOf(value) + 1) {
          return prevValue+1;
        }
        return prevValue;
      }, 0);
      return wordConsonantsCounter === consonantsCount;
    })
  }
  textArea.innerHTML = result.join("\n");
  resultBlock.classList.add('show');
}

function findSymbol(word, symbol, position) {
  return position === word.toLowerCase().indexOf(symbol);
}