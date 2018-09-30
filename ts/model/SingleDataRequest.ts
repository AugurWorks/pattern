import SymbolResult from './SymbolResult';

export default class {

  private symbolResult: SymbolResult;
  private offset = 0;
  private minOffset = 0;
  private maxOffset = 0;
  private aggregation = 'PERIOD_PERCENT_CHANGE';
  private dataType = 'CLOSE';

  constructor(symbol: string, private startDate: Date, private endDate: Date, private unit: string) {
    this.symbolResult = new SymbolResult(symbol, symbol);
  }
}
